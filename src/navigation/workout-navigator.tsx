import { createStackNavigator } from '@react-navigation/stack';
import WorkoutScreen from '../screens/workout';
import WorkoutsScreen from '../screens/workouts';
import { WorkoutStackParamList } from './navigation-props';

const Stack = createStackNavigator<WorkoutStackParamList>();

const WorkoutStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='WorkoutsScreen' component={WorkoutsScreen} />
      <Stack.Screen name='WorkoutScreen' component={WorkoutScreen} />
    </Stack.Navigator>
  );
};

export default WorkoutStack;
