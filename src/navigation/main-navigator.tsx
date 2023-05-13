import { useAppTheme } from '../App';
import HomeScreen from '../screens/home';
import UserProfile from '../screens/userProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkoutStack from './workout-navigator';
import GoalStack from './goal-navigator';

const Tab = createBottomTabNavigator();

const iconMap = new Map([
  ['Home', 'home'],
  ['Profile', 'account'],
  ['Goals', 'trophy'],
  ['Workouts', 'dumbbell'],
]);

const TabNavigator = () => {
  const appTheme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          return (
            <MaterialCommunityIcons
              name={iconMap.get(route.name)}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: appTheme.colors.onSurface,
        tabBarInactiveTintColor: appTheme.colors.secondary,
      })}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={UserProfile} />
      <Tab.Screen name='Goals' component={GoalStack} />
      <Tab.Screen name='Workouts' component={WorkoutStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
