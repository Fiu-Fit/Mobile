import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import HomeScreen from '../screens/home';
import WorkoutsScreen from '../screens/workouts';
import UserProfile from '../screens/userProfile';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Workouts' component={WorkoutsScreen} />
      <Stack.Screen name='Profile' component={UserProfile} />
    </Stack.Navigator>
  );
};

export default AuthStack;
