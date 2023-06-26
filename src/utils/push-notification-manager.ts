import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';
import LoggerFactory from './logger-utility';
import { axiosClient } from './constants';
import { NotificationType } from './notification-types';
import { User } from './custom-types';
import PushNotification, {
  ReceivedNotification,
} from 'react-native-push-notification';
import * as RootNavigation from '../navigation/root-navigator';

const logger = LoggerFactory('push-notification-manager');

export const requestPermissions = async (user: User) => {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if ((await granted) === PermissionsAndroid.RESULTS.GRANTED) {
      logger.info('User granted permission');

      const token = await getFCMToken();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { followedUsers, ...rest } = user;

      const updatedUser = await axiosClient.put<User>(`/users/${user.id}`, {
        ...rest,
        deviceToken: token,
      });

      logger.debug('Updated user: ', updatedUser);

      logger.info('Device token: ', token);
    } else {
      logger.info('User declined permission');
    }
  } catch (error) {
    logger.error('Error while requesting permission: ', { error });
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
    if (remoteMessage?.data.senderId) {
      return {
        type: NotificationType.NewMessage,
        id: remoteMessage?.data.senderId,
      };
    } else {
      throw Error('Invalid notification: Invalid message notification');
    }
  }
};

const navigateToScreen = (type: NotificationType, id: number) => {
  logger.info('Notification type: ', type.toString());

  PushNotification.configure({
    onNotification: async function (_: Omit<ReceivedNotification, 'userInfo'>) {
      logger.info('Goal id in onNotification: ', { id });

      if (type === NotificationType.GoalCompleted) {
        RootNavigation.navigate('Goals', {
          screen: 'GoalScreen',
          params: { itemId: Number(id) },
        });
      } else {
        const user = await axiosClient.get<User>(`/users/${id}`);
        RootNavigation.navigate('Search', {
          screen: 'ChatScreen',
          params: { user: user.data },
        });
      }
    },
  });
};

export const NotificationListener = () => {
  messaging().onMessage(remoteMessage => {
    logger.info('remote message on foreground!', JSON.stringify(remoteMessage));

    try {
      const result = notificationType(remoteMessage);
      if (!result) {
        throw Error('Invalid notification');
      }

      PushNotification.localNotification({
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
      });

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
