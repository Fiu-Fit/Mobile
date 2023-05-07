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

export type ExerciseType = {
  exerciseId: string;
  _id: string;
};

export type WorkoutProps = {
  _id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  exercises: ExerciseType[];
  athleteIds: number[];
  authorId: number;
  __v: number;
};
