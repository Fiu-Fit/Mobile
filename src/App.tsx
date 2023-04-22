import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/auth-navigator';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080'; // API Gateway URL

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
