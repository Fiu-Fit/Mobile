import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutProps } from '../utils/custom-types';
import { axiosClient } from '../utils/constants';
import { IWorkoutCard } from '../components/workoutCard/workoutCard';
import LoggerFactory from '../utils/logger-utility';

const logger = LoggerFactory('workout-store');

export class WorkoutStore {
  workouts: WorkoutProps[] = [];
  state = 'pending';

  get workoutCount() {
    return this.workouts.length;
  }
  get cardsInfo(): IWorkoutCard[] {
    return this.workouts.map(
      (workout): IWorkoutCard => ({
        id: workout._id,
        title: workout.name,
        content: workout.description,
      }),
    );
  }
  constructor() {
    makeObservable(this, {
      workouts: observable,
      workoutCount: computed,
      cardsInfo: computed,
      fetchWorkouts: flow,
    });
    this.fetchWorkouts();
  }

  *fetchWorkouts() {
    this.workouts = [];
    this.state = 'pending';
    try {
      logger.debug('Getting workouts...');
      const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts');
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.workouts = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
