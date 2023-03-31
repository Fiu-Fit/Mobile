import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen } from './screens/auth/signin';
import { SignUpScreen } from './screens/auth/signup';
import { HomeScreen } from './screens/home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In'}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App