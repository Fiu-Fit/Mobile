/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import HomeScreen from '../screens/home';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome', headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={LoginScreen}
        options={{title: 'Sign In', headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={RegisterScreen}
        options={{title: 'Sign Up', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
