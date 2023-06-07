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
  // Verificar que la notificación tenga la propiedad "notification" con un objeto
  if (
    !remoteMessage.notification ||
    typeof remoteMessage.notification !== 'object'
  ) {
    return null;
  }

  if (!remoteMessage.data || typeof remoteMessage.data !== 'object') {
    return null;
  }

  if (
    !remoteMessage.notification.title ||
    !remoteMessage.notification.body ||
    !remoteMessage.data.type
  ) {
    return null;
  }

  remoteMessage.data.type === NotificationType.GoalCompleted.toString()
    ? remoteMessage.data.goalId
      ? NotificationType.GoalCompleted
      : null
    : remoteMessage.data.type === NotificationType.NewMessage.toString()
    ? remoteMessage.data.messageId
      ? NotificationType.NewMessage
      : null
    : null;
};

export const NotificationListener = () => {
  messaging().onMessage(remoteMessage => {
    logger.info('remote message on foreground!', JSON.stringify(remoteMessage));

    const type = notificationType(remoteMessage);

    if (!type) {
      return;
    }

    Alert.alert(
      remoteMessage.notification?.title ?? '',
      remoteMessage.notification?.body ?? '',
    );

    if (type === NotificationType.GoalCompleted) {
      // navigate to goal detail
    } else {
      // navigate to chat
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
