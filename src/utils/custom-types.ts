import { Role } from '../constants/roles';
import { ProfileNavigationProp } from '../navigation/navigation-props';
import { Moment } from 'moment';

export type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bodyWeight: number;
  role: string;
};

export interface UserProfileProps {
  route?: {
    key: string;
    name: string;
    params: { givenUserId: number };
  };
  navigation?: ProfileNavigationProp;
  myProfile?: boolean;
}

export type ErrorInputProps = Omit<InputProps, 'role'>;

export type CommentInputProps = {
  comment: string;
};

export type ErrorCommentInputProps = CommentInputProps;

export type EditGoalInputProps = {
  description: string;
};

export type ErrorEditGoalProps = EditGoalInputProps;

export interface CardInfo {
  id: string | number;
  title: string;
  content: string;
  imageUrl: string;
  onPressScreen?: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  bodyWeight: number;
  interests: number[];
  deviceToken: string;
  coordinates: [number, number];
  followedUsers: User[];
  phoneNumber?: string;
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type DateRangeState = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  displayedDate: Moment;
};

export type ProgressProps = {
  traveledDistance: number;
  timeSpent: number;
  burntCalories: number;
  numberOfExercises: number;
};

export type DateState = {
  selectedDate: Date | undefined;
  displayedDate: Moment;
};
