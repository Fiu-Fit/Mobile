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

const tabBarIcon = ({
  color,
  size,
  name,
}: {
  color: string;
  size: number;
  name?: string;
}) => {
  return <MaterialCommunityIcons name={name ?? ''} size={size} color={color} />;
};

const TabNavigator = () => {
  const appTheme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) =>
          tabBarIcon({ color, size, name: iconMap.get(route.name) }),
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