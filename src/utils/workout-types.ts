import { CardInfo } from './custom-types';

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

export const categoryMap = new Map<number, string>([
  [CategoryType.LEGS, 'Legs'],
  [CategoryType.CHEST, 'Chest'],
  [CategoryType.BACK, 'Back'],
  [CategoryType.SHOULDERS, 'Shoulders'],
  [CategoryType.ARMS, 'Arms'],
  [CategoryType.CORE, 'Core'],
  [CategoryType.CARDIO, 'Cardio'],
  [CategoryType.FULLBODY, 'Full Body'],
  [CategoryType.FREEWEIGHT, 'Free Weight'],
  [CategoryType.STRETCHING, 'Stretching'],
  [CategoryType.STRENGTH, 'Strength'],
  [CategoryType.UNRECOGNIZED, 'Unrecognized'],
]);

export enum Unit {
  SECONDS = 0,
  REPETITIONS = 1,
  METERS = 2,
  UNRECOGNIZED = -1,
}

export const unitMap = new Map<Unit, string>([
  [Unit.SECONDS, 'Seconds'],
  [Unit.REPETITIONS, 'Repetitions'],
  [Unit.METERS, 'Meters'],
  [Unit.UNRECOGNIZED, 'None apply'],
]);

export type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  unit: Unit;
  exercise: Exercise;
};

export type Exercise = {
  _id: string;
  name: string;
  description: string;
  category: CategoryType;
};

export type WorkoutRating = {
  globalRating: number;
  comments: string[];
};

export type ExerciseCardInfo = CardInfo & {
  exercise: Exercise;
};

export type WorkoutProps = {
  _id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  category: CategoryType;
  rating: WorkoutRating;
  exercises: Map<string, WorkoutExercise>;
  athleteIds: number[];
  authorId: number;
  updatedAt?: Date;
};

export type IWorkoutHeader = {
  name: string;
  description: string;
  duration: number;
  rating: WorkoutRating;
  exerciseCount: number;
};
