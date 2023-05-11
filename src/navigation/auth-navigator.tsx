import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import WorkoutScreen from '../screens/workout';
import { RootStackParamList } from './navigation-props';
import InterestsScreen from '../screens/interests';
import GoalsScreen from '../screens/goals';
import TabNavigator from './tab-navigator';
import CreateGoalScreen from '../screens/createGoal';
import GoalScreen from '../screens/goal';
import WorkoutsScreen from '../screens/workouts';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Interests' component={InterestsScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Goals' component={GoalsScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Tab' component={TabNavigator} />
      <Stack.Screen name='Workout' component={WorkoutScreen} />
      <Stack.Screen name='Workouts' component={WorkoutsScreen} />
      <Stack.Screen name='CreateGoal' component={CreateGoalScreen} />
      <Stack.Screen name='Goal' component={GoalScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
