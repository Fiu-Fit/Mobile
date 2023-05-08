export enum CategoryType {
  LEGS = 0,
  CHEST = 1,
  BACK = 2,
  SHOULDERS = 3,
  ARMS = 4,
  CORE = 5,
  CARDIO = 6,
  FULLBODY = 7,
  FREEWEIGHT = 8,
  STRETCHING = 9,
  STRENGTH = 10,
  UNRECOGNIZED = -1,
}

export type ExerciseType = {
  _id: string;
  exerciseId: string;
  name: string;
  description: string;
  category: CategoryType;
};

export type WorkoutProps = {
  _id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  category: CategoryType;
  exercises: ExerciseType[];
  athleteIds: number[];
  authorId: number;
  updatedAt?: Date;
};
