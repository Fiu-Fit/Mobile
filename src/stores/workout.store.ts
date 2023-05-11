import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutProps } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { ICard } from '../utils/custom-types';

const logger = LoggerFactory('workout-store');

export class WorkoutStore {
  workouts: WorkoutProps[] = [];
  state = 'pending';

  get workoutCount() {
    return this.workouts.length;
  }
  get cardsInfo(): ICard[] {
    return this.workouts.map(
      (workout): ICard => ({
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
