import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppTheme } from '../App';
import HomeScreen from '../screens/home';
import UserProfile from '../screens/userProfile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoalsScreen from '../screens/goals';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const appTheme = useAppTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Goals') {
            iconName = 'details';
          }
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: appTheme.colors.onSurface,
        tabBarInactiveTintColor: appTheme.colors.secondary,
      })}>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Profile' component={UserProfile} />
      <Tab.Screen name='Goals' component={GoalsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
