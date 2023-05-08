import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutExerciseType } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import { IExerciseCard } from '../components/exerciseCard/exerciseCard';
import LoggerFactory from '../utils/logger-utility';
import { ExerciseStore } from './exercise.store';

const logger = LoggerFactory('exercise-store');

export class WorkoutExerciseStore {
  workoutExercises: WorkoutExerciseType[] = [];
  state = 'pending';

  private exerciseStores: Record<string, ExerciseStore> = {};

  get workoutExercisesCount() {
    return this.workoutExercises.length;
  }
  get cardsInfo(): IExerciseCard[] {
    return this.workoutExercises.map((workoutExercise): IExerciseCard => {
      const exerciseId = workoutExercise.exerciseId;
      let exerciseStore = this.exerciseStores[exerciseId];

      if (!exerciseStore) {
        exerciseStore = new ExerciseStore(exerciseId);
        this.exerciseStores[exerciseId] = exerciseStore;
      }

      return {
        id: workoutExercise.exerciseId,
        name: exerciseStore.exerciseInfo.name,
        description: exerciseStore.exerciseInfo.description,
        category: exerciseStore.exerciseInfo.category.toString(),
        sets: workoutExercise.sets.toString(),
        reps: workoutExercise.reps.toString(),
      };
    });
  }

  constructor(workoutId: string) {
    makeObservable(this, {
      workoutExercises: observable,
      workoutExercisesCount: computed,
      cardsInfo: computed,
      fetchWorkoutExercises: flow,
    });
    this.fetchWorkoutExercises(workoutId);
  }

  *fetchWorkoutExercises(workoutId: string) {
    this.workoutExercises = [];
    this.state = 'pending';
    try {
      logger.debug('Getting workouts...');
      const { data } = yield axiosClient.get<WorkoutExerciseType>(
        `/workouts/${workoutId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.workoutExercises = data.exercises;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
