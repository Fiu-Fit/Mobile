import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
import LoggerFactory from './logger-utility';
import { axiosClient } from './constants';
import { NotificationType } from './notification-types';
import { User } from './custom-types';

const logger = LoggerFactory('push-notification-manager');

export const requestPermissions = async (user: User) => {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if ((await granted) === PermissionsAndroid.RESULTS.GRANTED) {
      logger.info('User granted permission');

      const token = await getFCMToken();
      const updatedUser = await axiosClient.put<User>(`/users/${user.id}`, {
        ...user,
        deviceToken: token,
      });

      logger.debug('Updated user: ', updatedUser);

      logger.info('Device token: ', token);
    } else {
      logger.info('User declined permission');
    }
  } catch (error) {
    logger.error('Error while requesting permission: ', error);
  }
};

const getFCMToken = async (): Promise<string> => {
  let fcmtoken: string = (await AsyncStorage.getItem('fcmtoken')) ?? '';
  if (!fcmtoken) {
    try {
      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error: any) {
      logger.error(error);
    }
  }
  return fcmtoken;
};

const notificationType = (remoteMessage: any) => {
  logger.debug('Message Received:', remoteMessage);
  if (
    !remoteMessage?.notification ||
    typeof remoteMessage?.notification !== 'object'
  ) {
    throw Error('Invalid notification: Message doesnt have notification');
  }

  if (!remoteMessage.data || typeof remoteMessage.data !== 'object') {
    throw Error('Invalid notification: Message doesnt have data');
  }

  if (
    !remoteMessage?.notification.title ||
    !remoteMessage?.notification.body ||
    !remoteMessage?.data.type
  ) {
    throw Error('Invalid notification: Missing field in notification');
  }

  if (Number(remoteMessage?.data.type) === NotificationType.GoalCompleted) {
    if (remoteMessage?.data.goalId) {
      return {
        type: NotificationType.GoalCompleted,
        id: remoteMessage.data.goalId,
      };
    } else {
      throw Error('Invalid notification: Invalid goal notification');
    }
  }

  if (Number(remoteMessage?.data.type) === NotificationType.NewMessage) {
    if (remoteMessage?.data.messageId) {
      return {
        type: NotificationType.NewMessage,
        id: remoteMessage?.data.messageId,
      };
    } else {
      throw Error('Invalid notification: Invalid message notification');
    }
  }
};

const navigateToScreen = (type: NotificationType, id: number) => {
  if (type === NotificationType.GoalCompleted) {
    logger.info('Navigating to goal screen.. ', id);
    /*navigation.navigate('Goals', {
      screen: 'GoalScreen',
      params: { itemId: id },
    })*/
  } else {
    logger.info('Navigating to chat screen..');
    // navigate to chat
  }
};

export const NotificationListener = () => {
  messaging().onMessage(remoteMessage => {
    logger.info('remote message on foreground!', JSON.stringify(remoteMessage));

    try {
      const result = notificationType(remoteMessage);
      if (!result) {
        throw Error('Invalid notification');
      }

      navigateToScreen(result.type, result.id);
    } catch (error) {
      logger.error('Error while getting notification type: ', error);
    }
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    logger.info(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );

    try {
      const result = notificationType(remoteMessage);

      if (!result) {
        throw Error('Invalid notification');
      }

      navigateToScreen(result.type, result.id);
    } catch (error) {
      logger.error('Error while getting notification type: ', error);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        logger.info(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }

      try {
        const result = notificationType(remoteMessage);

        if (!result) {
          throw Error('Invalid notification');
        }

        navigateToScreen(result.type, result.id);
      } catch (error) {
        logger.error('Error while getting notification type: ', error);
      }
    });
};
