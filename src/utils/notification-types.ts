export type GoalNotificationProps = {
  _id: number;
  goalId: string;
  userId: number;
  receivedAt: Date;
};

export type MessageNotificationProps = {
  _id: string;
  messageId: string;
  userId: number;
  receivedAt: Date;
};
