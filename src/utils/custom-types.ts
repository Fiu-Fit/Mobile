export type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

export type ErrorInputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type CommentInputProps = {
  comment: string;
};

export type ErrorCommentInputProps = {
  comment: string;
};

export interface ICard {
  id: string;
  title: string;
  content: string;
}
