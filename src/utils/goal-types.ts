export enum GoalStatus {
  INPROGRESS = 'En progreso',
  COMPLETED = 'Completado',
  COMPLETEDLATE = 'Completado tarde',
}

export type GoalsProps = {
  id: string;
  title: string;
  description: string;
  userId: number;
  targetValue: number;
  deadline: Date;
  exerciseId: string;
  status: string;
};

export type GoalInputProps = {
  title: string;
  description: string;
  exerciseId: string;
  targetValue: string;
  deadline?: string;
};
