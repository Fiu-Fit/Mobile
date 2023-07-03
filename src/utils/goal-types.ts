export enum GoalStatus {
  INPROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  COMPLETEDLATE = 'CompletedLate',
}

export const goalMap = new Map<string, string>([
  ['InProgress', 'En progreso'],
  ['Completed', 'Completada'],
  ['CompletedLate', 'Completada Tarde'],
]);

export type GoalsProps = {
  id: number;
  title: string;
  description: string;
  userId: number;
  targetValue: number;
  deadline?: Date;
  exerciseId: string;
  status: GoalStatus;
  multimedia: string[];
};

export type GoalInputProps = {
  title: string;
  description: string;
  exerciseId: string | number | undefined;
  targetValue: string;
  deadline?: Date;
};
