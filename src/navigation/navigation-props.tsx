import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Demo: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  Workout: undefined;
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
export type DemoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Demo'
>;
export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
export type WorkoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workout'
>;
