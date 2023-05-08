import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;
export type WorkoutsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workouts'
>;
export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
