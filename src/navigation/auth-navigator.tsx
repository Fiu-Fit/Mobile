/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../screens/auth/signin';
import {SignUpScreen} from '../screens/auth/signup';
import {HomeScreen} from '../screens/home';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{title: 'Sign In', headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{title: 'Sign Up', headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
