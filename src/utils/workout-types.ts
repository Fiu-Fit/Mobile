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

export const imageMap = new Map<number, string>([
  [
    0,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory0.png?alt=media&token=81260bbe-6cc9-4fd3-818e-e2bfa1c583d6',
  ],
  [
    1,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory1.png?alt=media&token=8fde8ec3-f294-4ce5-bf86-915140c5149c',
  ],
  [
    2,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory2.png?alt=media&token=58f77a68-f185-49a1-a098-d40269796618',
  ],
  [
    3,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory3.png?alt=media&token=482a0088-777a-4ecf-964a-13f0482d337e',
  ],
  [
    4,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory4.png?alt=media&token=716bb227-c392-4d6d-83e6-28f07a4bd94a',
  ],
  [
    5,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory5.png?alt=media&token=65cc19bc-075e-4c1a-a58a-4f831cd75115',
  ],
  [
    6,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory6.png?alt=media&token=d1aa60b2-c7e7-48d9-804f-f8b3f9c42441',
  ],
  [
    7,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory7.png?alt=media&token=721ab990-9a60-4d46-94fc-a68847931161',
  ],
  [
    8,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory8.png?alt=media&token=92f53edb-e565-4d70-8304-637cb955a3f3',
  ],
  [
    9,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory9.png?alt=media&token=91e7d4b7-287b-4153-9c24-ee60a5c34dfb',
  ],
  [
    10,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Fcategory10.png?alt=media&token=8ca511aa-f37e-4abb-9187-c49045498fcc',
  ],
  [
    -1,
    'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Ferror.png?alt=media&token=252e80d6-d0bb-4281-a3a8-923218af07d6',
  ],
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
  [0, 'Enero'],
  [1, 'Febrero'],
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
  category: CategoryType;
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
