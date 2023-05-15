import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutProps } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';

const logger = LoggerFactory('workout-store');

export class WorkoutStore {
  workouts: WorkoutProps[] = [];
  state = 'pending';

  get workoutCount() {
    return this.workouts.length;
  }
  get cardsInfo(): CardInfo[] {
    return this.workouts.map(
      (workout): CardInfo => ({
        id: workout._id,
        title: workout.name,
        content: workout.description,
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      workouts: observable,
      workoutCount: computed,
      cardsInfo: computed,
      fetchWorkouts: flow,
      fetchFavoriteWorkouts: flow,
    });
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

  *fetchFavoriteWorkouts(userId: string) {
    this.workouts = [];
    this.state = 'pending';
    try {
      logger.debug(`Getting favorite workouts for id ${userId}...`);
      const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts');
      logger.debug(`Got data for user: ${userId}`, data);
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

export const workoutStore = new WorkoutStore();
