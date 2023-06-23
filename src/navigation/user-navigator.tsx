import { createStackNavigator } from '@react-navigation/stack';
import { UserStackParamList } from './navigation-props';
import UserProfileScreen from '../screens/userProfile';
import ChatScreen from '../screens/chat/chatScreen';
import ProfileSearchScreen from '../screens/profileSearchScreen';

const Stack = createStackNavigator<UserStackParamList>();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='UserSearchScreen' component={ProfileSearchScreen} />
      <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
