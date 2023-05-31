import { useAppTheme } from '../App';
import HomeScreen from '../screens/home';
import UserProfileScreen from '../screens/userProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WorkoutStack from './workout-navigator';
import GoalStack from './goal-navigator';
import ProfileSearchScreen from '../screens/profileSearchScreen';

const Tab = createBottomTabNavigator();

const iconMap = new Map([
  ['HomeTab', 'home'],
  ['Profile', 'account'],
  ['Goals', 'trophy'],
  ['Workouts', 'dumbbell'],
  ['Search', 'account-search'],
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
      initialRouteName='HomeTab'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) =>
          tabBarIcon({ color, size, name: iconMap.get(route.name) }),
        tabBarActiveTintColor: appTheme.colors.onSurface,
        tabBarInactiveTintColor: appTheme.colors.secondary,
      })}>
      <Tab.Screen name='HomeTab' component={HomeScreen} />
      <Tab.Screen name='Profile' component={UserProfileScreen} />
      <Tab.Screen name='Goals' component={GoalStack} />
      <Tab.Screen name='Workouts' component={WorkoutStack} />
      <Tab.Screen name='Search' component={ProfileSearchScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
