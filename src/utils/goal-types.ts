export enum GoalStatus {
  INPROGRESS = 'InProgress',
  COMPLETED = 'Completed',
  COMPLETEDLATE = 'CompletedLate',
}

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
