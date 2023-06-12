import { createStackNavigator } from '@react-navigation/stack';
import { UserStackParamList } from './navigation-props';
import UserProfileScreen from '../screens/userProfile';
import ChatScreen from '../screens/chat/chatScreen';

const Stack = createStackNavigator<UserStackParamList>();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='UserSearch' component={UserProfileScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
