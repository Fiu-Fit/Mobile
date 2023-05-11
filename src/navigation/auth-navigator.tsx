import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import WorkoutsScreen from '../screens/workouts';
import UserProfile from '../screens/userProfile';
import WorkoutScreen from '../screens/workout';
import { RootStackParamList } from './navigation-props';
import InterestsScreen from '../screens/interests';
import GoalsScreen from '../screens/goals';
import TabNavigator from './tab-navigator';
import PasswordRecovery from '../screens/password-recovery';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={TabNavigator} />
      <Stack.Screen name='Interests' component={InterestsScreen} />
      <Stack.Screen name='PasswordRecovery' component={PasswordRecovery} />
      <Stack.Screen name='Goals' component={GoalsScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Workouts' component={WorkoutsScreen} />
      <Stack.Screen name='Workout' component={WorkoutScreen} />
      <Stack.Screen name='Profile' component={UserProfile} />
    </Stack.Navigator>
  );
};

export default AuthStack;
