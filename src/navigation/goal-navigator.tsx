import { createStackNavigator } from '@react-navigation/stack';
import { GoalStackParamList } from './navigation-props';
import GoalsScreen from '../screens/goals';
import CreateGoalScreen from '../screens/createGoal';
import GoalScreen from '../screens/goal';

const Stack = createStackNavigator<GoalStackParamList>();

const GoalStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='GoalsScreen' component={GoalsScreen} />
      <Stack.Screen name='CreateGoalScreen' component={CreateGoalScreen} />
      <Stack.Screen name='GoalScreen' component={GoalScreen} />
    </Stack.Navigator>
  );
};

export default GoalStack;
