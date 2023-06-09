import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, PermissionsAndroid } from 'react-native';
import LoggerFactory from './logger-utility';
import { axiosClient } from './constants';
import { NotificationType } from './notification-types';

const logger = LoggerFactory('push-notification-manager');

export const requestPermissions = async (userId: number) => {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if ((await granted) === PermissionsAndroid.RESULTS.GRANTED) {
      logger.info('User granted permission');

      const token = await getFCMToken();
      await axiosClient.patch(`/users/${userId}/token`, { token });

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
  if (
    !remoteMessage.notification ||
    typeof remoteMessage.notification !== 'object'
  ) {
    throw Error('Invalid notification');
  }

  if (!remoteMessage.data || typeof remoteMessage.data !== 'object') {
    throw Error('Invalid notification');
  }

  if (
    !remoteMessage.notification.title ||
    !remoteMessage.notification.body ||
    !remoteMessage.data.type
  ) {
    throw Error('Invalid notification');
  }

  if (remoteMessage.data.type === NotificationType.GoalCompleted) {
    if (remoteMessage.data.goalId) {
      return {
        type: NotificationType.GoalCompleted,
        id: remoteMessage.data.goalId,
      };
    } else {
      throw Error('Invalid notification');
    }
  }

  if (remoteMessage.data.type === NotificationType.NewMessage) {
    if (remoteMessage.data.chatId) {
      return {
        type: NotificationType.NewMessage,
        id: remoteMessage.data.messageId,
      };
    } else {
      throw Error('Invalid notification');
    }
  }
};

export const NotificationListener = () => {
  messaging().onMessage(remoteMessage => {
    logger.info('remote message on foreground!', JSON.stringify(remoteMessage));

    try {
      const result = notificationType(remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title ?? '',
        remoteMessage.notification?.body ?? '',
      );

      if (result?.type === NotificationType.GoalCompleted) {
        logger.info('Navigating to goal screen..');
        // navigate to goal
      } else {
        logger.info('Navigating to chat screen..');
        // navigate to chat
      }
    } catch (error) {
      logger.error('Error while getting notification type: ', error);
    }
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    logger.info(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
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
    });
};
