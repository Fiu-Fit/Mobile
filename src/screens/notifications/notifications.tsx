import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NotificationsNavigationProp } from '../../navigation/navigation-props';
import { useAppTheme } from '../../App';
import { Text } from 'react-native-paper';

const NotificactionsScreen = ({
  navigation,
}: {
  navigation: NotificationsNavigationProp;
}) => {
  const [_, setLoading] = useState(true);
  const appTheme = useAppTheme();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate('Goals');
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
      setLoading(false);
    });

  return (
    <View style={{ backgroundColor: appTheme.colors.background, flex: 1 }}>
      <Text>Notifications</Text>
    </View>
  );
};

export default NotificactionsScreen;
