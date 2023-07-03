import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutProps, categoryMap, imageMap } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';

const logger = LoggerFactory('workout-store');

export class WorkoutStore {
  workouts: WorkoutProps[] = [];
  favoriteWorkouts: WorkoutProps[] = [];
  state = 'pending';
  selectedTypeFilter: number | undefined = undefined;
  selectedDifficultyFilter: number | undefined = undefined;

  get workoutsCount() {
    return this.workouts.length;
  }

  get workoutCardsInfo(): CardInfo[] {
    return this.workouts.map(
      (workout): CardInfo => ({
        id: workout._id,
        title: workout.name,
        content: categoryMap.get(workout.category) || 'undefined',
        type: 'workout',
        imageUrl:
          imageMap.get(workout.category) ??
          'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2Ferror.png?alt=media&token=252e80d6-d0bb-4281-a3a8-923218af07d6',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      workouts: observable,
      favoriteWorkouts: observable,
      selectedTypeFilter: observable,
      selectedDifficultyFilter: observable,
      workoutsCount: computed,
      workoutCardsInfo: computed,
      fetchWorkouts: flow,
      fetchFavoriteWorkouts: flow,
      fetchRecommendedWorkouts: flow,
    });
  }

  *fetchWorkouts() {
    this.workouts = [];
    this.state = 'pending';
    try {
      const filters = {
        category: this.selectedTypeFilter,
        difficulty: this.selectedDifficultyFilter,
        isBlocked: false,
      };

      const params = {
        filters: JSON.stringify(filters),
      };
      logger.debug('Getting workouts...');
      const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts', {
        params,
      });
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.workouts = data;
        this.state = 'done';
      });
    } catch (e) {
      logger.error('Error while fetching all workouts:', e);
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
        isBlocked: false,
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
      logger.error('Error while fetching recommended workouts:', e);
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *fetchFavoriteWorkouts(userId: number) {
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
        this.favoriteWorkouts = data;
        this.state = 'done';
      });
    } catch (e) {
      logger.error('Error while fetching favorite workouts:', e);
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const workoutStore = new WorkoutStore();
