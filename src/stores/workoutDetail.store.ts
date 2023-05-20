import {
  makeObservable,
  observable,
  computed,
  flow,
  runInAction,
  action,
} from 'mobx';
import {
  CategoryType,
  ExerciseCardInfo,
  IWorkoutHeader,
  WorkoutExercise,
  WorkoutProps,
} from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';

const logger = LoggerFactory('workout-detail-store');

const defaultWorkout = {
  _id: '',
  name: '',
  description: '',
  duration: 0,
  difficulty: 0,
  category: CategoryType.FULLBODY,
  rating: { globalRating: 0, comments: [] },
  exercises: new Map<string, WorkoutExercise>(),
  athleteIds: [],
  authorId: 0,
};

export class WorkoutDetailStore {
  workoutId: string | undefined;
  workout: WorkoutProps = defaultWorkout;
  state = 'pending';

  get workoutHeader(): IWorkoutHeader {
    const { name, description, duration, exercises } = this.workout;
    return {
      name,
      description,
      duration,
      rating: {
        globalRating: 4,
        comments: [
          '¡Wow! Realmente disfruté este entrenamiento. Los ejercicios fueron desafiantes y me encantó cómo trabajaron diferentes grupos musculares. ¡Definitivamente quiero hacerlo de nuevo!',
          '¡Increíble sesión de entrenamiento! Los ejercicios fueron variados y efectivos. Me encantó cómo pude sentir que mi cuerpo se fortalecía con cada movimiento. ¡Altamente recomendado!',
          'Qué gran entrenamiento. Los ejercicios fueron divertidos y me mantuvieron comprometido durante toda la sesión. Me encantó la combinación de fuerza y cardio. ¡Me siento enérgico y revitalizado!',
        ],
      },
      exerciseCount: exercises.size,
    };
  }

  get exerciseCards(): ExerciseCardInfo[] {
    return Array.from(this.workout.exercises.values()).map(
      (workoutExercise): ExerciseCardInfo => {
        return {
          id: workoutExercise.exerciseId,
          title: workoutExercise.exercise?.name ?? 'Name missing',
          content: `${workoutExercise.sets} x ${workoutExercise.reps}`,
          exercise: workoutExercise.exercise,
          imageUrl:
            'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
        };
      },
    );
  }

  get exercises(): WorkoutExercise[] {
    return Array.from(this.workout.exercises.values());
  }

  constructor() {
    makeObservable(this, {
      workoutId: observable,
      workout: observable,
      state: observable,
      exerciseCards: computed,
      workoutHeader: computed,
      addExercise: action,
      editExercise: action,
      removeExercise: action,
      fetchWorkout: flow,
    });
  }

  *fetchWorkout(workoutId: string) {
    this.state = 'pending';
    if (!workoutId || workoutId === '') {
      this.workout = defaultWorkout;
      this.state = 'done';
      return;
    }
    try {
      logger.debug('Getting workout detail...');
      const { data } = yield axiosClient.get<WorkoutProps>(
        `/workouts/${workoutId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        const {
          exercises: exercisesList,
        }: {
          exercises: WorkoutExercise[];
        } = data;
        const workoutData = data;
        this.workout = {
          ...workoutData,
          exercises: new Map<string, WorkoutExercise>(),
        };
        logger.info('Workout Data:', workoutData);
        this.workout.exercises = exercisesList.reduce((map, exercise) => {
          if (map.has(exercise.exerciseId)) {
            return map;
          }
          map.set(exercise.exerciseId, exercise);
          return map;
        }, this.workout.exercises);
        logger.debug('Loaded Workout: ', this.workout);
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
  addExercise(exercise: WorkoutExercise) {
    this.workout.exercises.set(exercise.exerciseId, exercise);
  }

  editExercise(exerciseId: string, exercise: WorkoutExercise) {
    this.workout.exercises.set(exerciseId, exercise);
  }

  removeExercise(exerciseId: string) {
    this.workout.exercises.delete(exerciseId);
  }
}

export const workoutDetailStore = new WorkoutDetailStore();
