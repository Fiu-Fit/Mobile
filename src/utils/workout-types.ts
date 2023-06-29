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
  [0, 'Piernas'],
  [1, 'Pecho'],
  [2, 'Espalda'],
  [3, 'Hombros'],
  [4, 'Brazos'],
  [5, 'Core'],
  [6, 'Cardio'],
  [7, 'Fullbody'],
  [8, 'Peso Libre'],
  [9, 'Estiramiento'],
  [10, 'Fuerza'],
  [-1, 'Cualquiera'],
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
  { label: 'Cualquiera', key: undefined },
];

export const workoutDifficultyOptions = [
  { label: 'Muy fácil', key: 1 },
  { label: 'Fácil', key: 2 },
  { label: 'Intermedio', key: 3 },
  { label: 'Difícil', key: 4 },
  { label: 'Muy difícil', key: 5 },
  { label: 'Cualquiera', key: undefined },
];

export const difficultyMap = new Map<number, string>([
  [1, 'Muy fácil'],
  [2, 'Fácil'],
  [3, 'Intermedio'],
  [4, 'Difícil'],
  [5, 'Muy difícil'],
  [-1, 'Cualquiera'],
]);

export const workoutMetricYear = [
  { label: '2023', key: 2023 },
  { label: '2022', key: 2022 },
  { label: '2021', key: 2021 },
  { label: '2020', key: 2020 },
];

export const yearMap = new Map<number, string>([
  [2023, '2023'],
  [2022, '2022'],
  [2021, '2021'],
  [2020, '2020'],
]);

export const monthMap = new Map<number, string>([
  [0, 'Ene'],
  [1, 'Feb'],
  [2, 'Marzo'],
  [3, 'Abril'],
  [4, 'Mayo'],
  [5, 'Junio'],
  [6, 'Julio'],
  [7, 'Agosto'],
  [8, 'Septiembre'],
  [9, 'Octubre'],
  [10, 'Noviembre'],
  [11, 'Diciembre'],
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
  averageRating: number;
  exercises: Map<string, WorkoutExercise>;
  athleteIds: number[];
  authorId: number;
  updatedAt?: Date;
  multimedia: string[];
};

export type IWorkoutHeader = {
  name: string;
  description: string;
  duration: number;
  author: string;
  averageRating: number;
  exerciseCount: number;
};

export type WorkoutRatingProps = {
  _id: string;
  workoutId: string;
  athleteId: number;
  rating: number;
  comment?: string;
  ratedAt: Date;
};

export type RatingCount = {
  rating: number;
  count: number;
};

export type WorkoutMetric = {
  favoriteCount: number;
  averageRating: number;
  ratings: RatingCount[];
};
