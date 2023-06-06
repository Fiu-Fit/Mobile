export interface NotificationProps {
  _id: number;
  athleteId: number;
  messageId?: string;
  goalId?: string;
  receivedAt: Date;
}