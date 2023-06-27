export const GOAL_NOTIFICATION_TITLE = 'Meta cumplida';
export const MESSAGE_NOTIFICATION_TITLE = 'Mensaje nuevo';

export const GOAL_NOTIFICATION_CONTENT = (goalName: string) => {
  return `Completaste la meta "${goalName}"!`;
};

export const MESSAGE_NOTIFICATION_CONTENT = (senderName: string) => {
  return `${senderName} te envió un mensaje`;
};

export interface GoalNotificationProps {
  _id: number;
  athleteId: number;
  goalId: number;
  goalTitle: string;
  receivedAt: Date;
}

export interface MessageNotificationProps {
  _id: number;
  athleteId: number;
  senderId: string;
  senderName: string;
  receivedAt: Date;
}

export enum NotificationType {
  GoalCompleted = 0,
  NewMessage = 1,
}
