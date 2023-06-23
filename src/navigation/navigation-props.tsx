import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { User, UserProfileProps } from '../utils/custom-types';

export type AuthStackParamList = {
  LoginScreen: undefined;
  EditProfile: undefined;
  SearchedProfile: UserProfileProps;
  RegisterScreen: undefined;
  InterestsScreen: { name: string };
  PasswordRecoveryScreen: undefined;
  Home: undefined;
};

export type WorkoutStackParamList = {
  WorkoutScreen: { itemId: string | number };
  WorkoutsScreen: undefined;
  UpsertWorkoutScreen: { itemId?: string | number };
};

export type GoalStackParamList = {
  CreateGoalScreen: undefined;
  GoalScreen: { itemId: number };
  GoalsScreen: undefined;
};

export type NotificationStackParamList = {
  NotificationScreen: undefined;
};

export type TabParamList = {
  WorkoutScreen: Omit<WorkoutStackParamList, 'WorkoutsScreen'>;
  Workouts: undefined;
  Goals: undefined;
  Profile: undefined;
  HomeTab: undefined;
  UserSearch: undefined;
  LoginScreen: undefined;
  Users: undefined;
};

export type UserStackParamList = {
  UserSearch: {
    givenUserId: number;
    canEdit: boolean;
  };
  ChatScreen: { user: User };
  Notification: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'LoginScreen'
>;

export type PasswordRecoveryScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'PasswordRecoveryScreen'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'RegisterScreen'
>;

export type InterestsScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'InterestsScreen'
>;

export type WorkoutScreenNavigationProp = StackNavigationProp<
  WorkoutStackParamList,
  'WorkoutScreen'
>;

export type WorkoutsScreenNavigationProp = StackNavigationProp<
  WorkoutStackParamList,
  'WorkoutsScreen'
>;
export type UpsertWorkoutScreenNavigationProp = StackNavigationProp<
  WorkoutStackParamList,
  'UpsertWorkoutScreen'
>;
export type CreateGoalScreenNavigationProp = StackNavigationProp<
  GoalStackParamList,
  'CreateGoalScreen'
>;
export type GoalScreenNavigationProp = StackNavigationProp<
  GoalStackParamList,
  'GoalScreen'
>;

export type GoalsScreenNavigationProp = StackNavigationProp<
  GoalStackParamList,
  'GoalsScreen'
>;

export type NotificationsScreenNavigationProp = StackNavigationProp<
  NotificationStackParamList,
  'NotificationScreen'
>;

export type WorkoutsNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Workouts'
>;

export type ProfileNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Profile'
>;

export type GoalsNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Goals'
>;

export type HomeNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'HomeTab'
>;

export type NotificationsNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'Notification'
>;
export type UserSearchNavigationProp = BottomTabNavigationProp<
  TabParamList,
  'UserSearch'
>;
