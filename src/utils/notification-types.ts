export interface NotificationProps {
  _id: number;
  athleteId: number;
  messageId?: string;
  goalId?: string;
  receivedAt: Date;
}

export enum NotificationType {
  GoalCompleted = 0,
  NewMessage = 1,
}
