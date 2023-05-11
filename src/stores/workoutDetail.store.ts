import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import {
  CategoryType,
  IExerciseCard,
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
  get exerciseCards(): IExerciseCard[] {
    return this.workout.exercises.map((workoutExercise): IExerciseCard => {
      return {
        id: workoutExercise.exerciseId,
        title: workoutExercise.exercise.name,
        content: `${workoutExercise.sets} x ${workoutExercise.reps}`,
        exercise: workoutExercise.exercise,
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
