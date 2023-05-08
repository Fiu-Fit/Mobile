import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutExerciseType } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import { IExerciseCard } from '../components/exerciseCard/exerciseCard';
import LoggerFactory from '../utils/logger-utility';

const logger = LoggerFactory('exercise-store');

export class ExerciseStore {
  exercises: WorkoutExerciseType[] = [];
  state = 'pending';

  get exercisesCount() {
    return this.exercises.length;
  }
  get cardsInfo(): IExerciseCard[] {
    console.log('AAsds: ', this.exercises);
    return this.exercises.map(
      (exercise): IExerciseCard => ({
        id: exercise._id,
        sets: exercise.sets.toString(),
        reps: exercise.reps.toString(),
      }),
    );
  }

  constructor(workoutId: string) {
    makeObservable(this, {
      exercises: observable,
      exercisesCount: computed,
      cardsInfo: computed,
      fetchExercises: flow,
    });
    this.fetchExercises(workoutId);
  }

  *fetchExercises(workoutId: string) {
    this.exercises = [];
    this.state = 'pending';
    try {
      logger.debug('Getting workouts...');
      const { data } = yield axiosClient.get<WorkoutExerciseType>(
        `/workouts/${workoutId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.exercises = data.exercises;
        console.log('Exercises: ', this.exercises);
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
