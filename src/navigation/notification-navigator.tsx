import { createStackNavigator } from '@react-navigation/stack';
import NotificationScreen from '../screens/notifications';
import { NotificationStackParamList } from './navigation-props';

const Stack = createStackNavigator<NotificationStackParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='NotificationScreen' component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
