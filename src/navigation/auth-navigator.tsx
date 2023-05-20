import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import { AuthStackParamList } from './navigation-props';
import InterestsScreen from '../screens/interests';
import PasswordRecovery from '../screens/password-recovery';
import TabNavigator from './main-navigator';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='InterestsScreen' component={InterestsScreen} />
      <Stack.Screen
        name='PasswordRecoveryScreen'
        component={PasswordRecovery}
      />
      <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
      <Stack.Screen name='Home' component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthStack;
