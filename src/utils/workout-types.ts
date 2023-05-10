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

export enum Unit {
  SECONDS = 0,
  REPETITIONS = 1,
  METERS = 2,
  UNRECOGNIZED = -1,
}

export type Exercise = {
  exerciseId: string;
  name: string;
  description: string;
  category: CategoryType;
  sets: number;
  reps: number;
  weight?: number;
  unit: Unit;
};

export type WorkoutProps = {
  _id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  category: CategoryType;
  rating: number;
  exercises: Exercise[];
  athleteIds: number[];
  authorId: number;
  updatedAt?: Date;
};

export type ExerciseInfo = {
  exerciseId: string;
  name: string;
  description: string;
  category: CategoryType;
};

export type IWorkoutHeader = {
  name: string;
  description: string;
  duration: number;
  globalRating: number;
  exerciseCount: number;
};
