import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Workouts: undefined;
  Workout: { workoutId: string };
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  Interests: { name: string };
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
export type WorkoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Workout'
>;
export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;
export type InterestsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Interests'
>;
