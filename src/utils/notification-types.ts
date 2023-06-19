export const GOAL_NOTIFICATION_TITLE = 'Meta cumplida';
export const MESSAGE_NOTIFICATION_TITLE = 'Nuevo mensaje';

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
  messageId: string;
  receivedAt: Date;
  senderMessage: string;
}

export enum NotificationType {
  GoalCompleted = 0,
  NewMessage = 1,
}
