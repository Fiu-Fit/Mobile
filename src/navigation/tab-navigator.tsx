import { useAppTheme } from '../App';
import HomeScreen from '../screens/home';
import UserProfile from '../screens/userProfile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoalsScreen from '../screens/goals';
import WorkoutsScreen from '../screens/workouts';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const appTheme = useAppTheme();
  const iconMap = new Map([
    ['Home', 'home'],
    ['Profile', 'account'],
    ['Goals', 'trophy'],
    ['Workouts', 'dumbbell'],
  ]);

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
      <Tab.Screen name='Goals' component={GoalsScreen} />
      <Tab.Screen name='Workouts' component={WorkoutsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
