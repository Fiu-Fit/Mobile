import { Role } from '../constants/roles';
import { UserProfileScreenNavigationProp } from '../navigation/navigation-props';
import { Moment } from 'moment';

export type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bodyWeight: number;
  role: string;
  phoneNumber: string;
};

export interface UserProfileProps {
  route?: {
    key: string;
    name: string;
    params: { givenUserId: number };
  };
  navigation?: UserProfileScreenNavigationProp;
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
  type: string;
  imageUrl: string;
  onPressScreen?: string;
}

export type VerificationStatus = 'Pending' | 'Declined' | 'Approved';

export type Verification = {
  id: number;
  userId: number;
  status: VerificationStatus;
  resourceId: string;
  receivedAt: Date;
};

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
  uid: string;
  followedUsers: User[];
  followers: User[];
  phoneNumber?: string;
  verification?: Verification;
  profilePicture?: string;
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

export type BarData = {
  value: number;
  label: string;
};

export type BarChartProps = { label: string; value: number }[];
