import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AuthStack from './navigation/auth-navigator';
import axios from 'axios';
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';

axios.defaults.baseURL = 'http://localhost:8080'; // API Gateway URL

const App = () => {
  const colorScheme = useColorScheme();
  const { DarkTheme } = adaptNavigationTheme({
    reactNavigationDark: DefaultTheme,
  });
  const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });

  const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const rNavTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={rNavTheme}>
        <AuthStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
