import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-navigator';

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}

export default App