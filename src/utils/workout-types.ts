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
  [0, 'Legs'],
  [1, 'Chest'],
  [2, 'Back'],
  [3, 'Shoulders'],
  [4, 'Arms'],
  [5, 'Core'],
  [6, 'Cardio'],
  [7, 'Full Body'],
  [8, 'Free Weight'],
  [9, 'Stretching'],
  [10, 'Strength'],
  [-1, 'Unrecognized'],
]);

export const workoutCategoryOptions = [
  { label: 'Piernas', key: 0 },
  { label: 'Pecho', key: 1 },
  { label: 'Espalda', key: 2 },
  { label: 'Hombros', key: 3 },
  { label: 'Brazos', key: 4 },
  { label: 'Core', key: 5 },
  { label: 'Cardio', key: 6 },
  { label: 'Fullbody', key: 7 },
  { label: 'Peso libre', key: 8 },
  { label: 'Estiramiento', key: 9 },
  { label: 'Fuerza', key: 10 },
];

export const workoutDifficultyOptions = [
  { label: 'Muy fácil', key: 1 },
  { label: 'Fácil', key: 2 },
  { label: 'Intermedio', key: 3 },
  { label: 'Difícil', key: 4 },
  { label: 'Muy difícil', key: 5 },
];

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
  _id: string;
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
  author: string;
  rating: WorkoutRating;
  exerciseCount: number;
};
