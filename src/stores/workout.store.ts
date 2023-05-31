import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutProps, categoryMap } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';

const logger = LoggerFactory('workout-store');

export class WorkoutStore {
  workouts: WorkoutProps[] = [];
  state = 'pending';

  get workoutsCount() {
    return this.workouts.length;
  }

  get workoutCardsInfo(): CardInfo[] {
    return this.workouts.map(
      (workout): CardInfo => ({
        id: workout._id,
        title: workout.name,
        content: categoryMap.get(workout.category) || 'undefined',
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      workouts: observable,
      workoutsCount: computed,
      workoutCardsInfo: computed,
      fetchWorkouts: flow,
      fetchFavoriteWorkouts: flow,
      fetchRecommendedWorkouts: flow,
      fetchFilteredWorkouts: flow,
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

  *fetchRecommendedWorkouts(interests: number[]) {
    this.workouts = [];
    this.state = 'pending';
    try {
      const filters = {
        category: interests,
      };

      const params = {
        filters: JSON.stringify(filters),
      };

      logger.debug('Getting recommended workouts...');
      const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts', {
        params,
      });
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
      const { data } = yield axiosClient.get<WorkoutProps[]>(
        `/users/${userId}/favoriteWorkouts`,
      );
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

  *fetchFilteredWorkouts(workoutType: number, workoutDifficulty: number) {
    this.workouts = [];
    this.state = 'pending';
    try {
      const filters = {
        category: workoutType,
        difficulty: workoutDifficulty,
      };

      const params = {
        filters: JSON.stringify(filters),
      };

      logger.debug('Getting filtered workouts...');
      const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts', {
        params,
      });
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

export const workoutStore = new WorkoutStore();
