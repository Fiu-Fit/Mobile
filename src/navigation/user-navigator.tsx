import { createStackNavigator } from '@react-navigation/stack';
import { UserStackParamList } from './navigation-props';
import UserProfileScreen from '../screens/userProfile';
import ChatScreen from '../screens/chat/chatScreen';
import ProfileSearchScreen from '../screens/profileSearchScreen';
import UserListScreen from '../screens/userList';
import MyProfileScreen from '../screens/myProfile';

const Stack = createStackNavigator<UserStackParamList>();

const UserStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} />
      <Stack.Screen name='UserSearchScreen' component={ProfileSearchScreen} />
      <Stack.Screen name='UserProfileScreen' component={UserProfileScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='UserListScreen' component={UserListScreen} />
    </Stack.Navigator>
  );
};

export default UserStack;
