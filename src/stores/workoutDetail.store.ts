import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
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
  author: '',
  difficulty: 0,
  category: CategoryType.LEGS,
  rating: { globalRating: 0, comments: [] },
  exercises: [],
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
      author: 'Jorge',
      rating: {
        globalRating: 4,
        comments: [
          '¡Wow! Realmente disfruté este entrenamiento. Los ejercicios fueron desafiantes y me encantó cómo trabajaron diferentes grupos musculares. ¡Definitivamente quiero hacerlo de nuevo!',
          '¡Increíble sesión de entrenamiento! Los ejercicios fueron variados y efectivos. Me encantó cómo pude sentir que mi cuerpo se fortalecía con cada movimiento. ¡Altamente recomendado!',
          'Qué gran entrenamiento. Los ejercicios fueron divertidos y me mantuvieron comprometido durante toda la sesión. Me encantó la combinación de fuerza y cardio. ¡Me siento enérgico y revitalizado!',
        ],
      },
      exerciseCount: exercises.length,
    };
  }

  get exerciseCards(): ExerciseCardInfo[] {
    return this.workout.exercises.map((workoutExercise): ExerciseCardInfo => {
      return {
        id: workoutExercise.exerciseId,
        title: workoutExercise.exercise?.name ?? 'Name missing',
        content: `${workoutExercise.sets} x ${workoutExercise.reps}`,
        exercise: workoutExercise.exercise,
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
      };
    });
  }

  get exercises(): WorkoutExercise[] {
    return this.workout.exercises;
  }

  constructor() {
    makeObservable(this, {
      workoutId: observable,
      workout: observable,
      state: observable,
      exerciseCards: computed,
      workoutHeader: computed,
      fetchWorkout: flow,
      addWorkoutAsFavourite: flow,
    });
  }

  *fetchWorkout(workoutId: string) {
    this.state = 'pending';
    try {
      logger.debug('Getting workout detail...');
      const { data } = yield axiosClient.get<WorkoutProps>(
        `/workouts/${workoutId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.workout = data;
        logger.debug('Loaded Workout: ', this.workout);
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *addWorkoutAsFavourite(userId: number) {
    this.state = 'pending';
    try {
      logger.debug('Adding workout as favourite...');
      const { data } = yield axiosClient.put(
        `/users/${userId}/favoriteWorkouts`,
        this.workout._id,
      );
      logger.debug('Got data: ', data);
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const workoutDetailStore = new WorkoutDetailStore();
