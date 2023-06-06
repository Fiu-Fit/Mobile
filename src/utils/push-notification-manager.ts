import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, PermissionsAndroid } from 'react-native';
import LoggerFactory from './logger-utility';
// import { PushNotification } from 'react-native-push-notification';
import { useEffect } from 'react';
import { axiosClient } from './constants';

const logger = LoggerFactory('push-notification-manager');

export const requestPermissions = async (userId: number) => {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if ((await granted) === PermissionsAndroid.RESULTS.GRANTED) {
      logger.info('User granted permission');

      const token = getFCMToken();

      await axiosClient.patch(`/users/${userId}/token`, { token });

      logger.info('Device token: ', token);
    } else {
      logger.info('User declined permission');
    }
  } catch (error) {
    logger.error('Error while requesting permission: ', error);
  }
};

// PushNotification.createChannel(
//   {
//     channelId: 'default-channel-id', // (required)
//     channelName: 'Default channel', // (required)
//     playSound: false,
//     vibrate: true,
//     importance: 4,
//   },
//   (created: any) =>
//     logger.info(`createChannel 'default-channel-id' returned '${created}'`),
// );

const getFCMToken = async () => {
  let fcmtoken = AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const NotificationListener = () => {
  // useEffect(() => {
  // PushNotification.localNotification({
  //   message: remoteMessage.notification.body,
  //   title: remoteMessage.notification.title,
  //   channelId: remoteMessage.notification.android.channelId,
  // });
  // return unsubscribe;
  // }, []);

  messaging().onMessage(remoteMessage => {
    logger.info('remote message on foreground!', JSON.stringify(remoteMessage));

    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
