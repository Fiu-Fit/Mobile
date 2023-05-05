import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import HomeScreen from '../screens/home';
import DemoScreen from '../screens/demo';
import UserProfile from '../screens/userProfile';
import WorkoutScreen from '../screens/workout';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Workout' component={WorkoutScreen} />
      <Stack.Screen name='Demo' component={DemoScreen} />
      <Stack.Screen name='Profile' component={UserProfile} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
