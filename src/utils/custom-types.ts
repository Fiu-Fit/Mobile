import { Role } from '../constants/roles';

export type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bodyWeight: number;
  role: string;
};

export type ErrorInputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bodyWeight: string;
};

export type CommentInputProps = {
  comment: string;
};

export type ErrorCommentInputProps = {
  comment: string;
};

export interface CardInfo {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  bodyWeight: number;
};
