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

const logger = LoggerFactory('exercise-store');

const defaultWorkout = {
  _id: '',
  name: '',
  description: '',
  duration: 0,
  difficulty: 0,
  category: CategoryType.LEGS,
  rating: 0,
  exercises: [],
  athleteIds: [],
  authorId: 0,
};

export class WorkoutDetailStore {
  workoutId: string | undefined;
  workout: WorkoutProps = defaultWorkout;
  state = 'pending';

  get workoutHeader(): IWorkoutHeader {
    const {
      name,
      description,
      duration,
      rating: globalRating,
      exercises,
    } = this.workout;
    return {
      name,
      description,
      duration,
      globalRating,
      exerciseCount: exercises.length,
    };
  }
  get exerciseCards(): ExerciseCardInfo[] {
    return this.workout.exercises.map((workoutExercise): ExerciseCardInfo => {
      return {
        id: workoutExercise.exerciseId,
        title: workoutExercise.exercise.name,
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
    });
  }

  *fetchWorkout(workoutId: string) {
    this.state = 'pending';
    try {
      logger.debug('Getting workouts...');
      const { data } = yield axiosClient.get<WorkoutProps>(
        `/workouts/${workoutId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.workout = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
