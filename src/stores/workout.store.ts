import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { WorkoutProps, categoryMap } from '../utils/workout-types';
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
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
      }),
    );
  }

  get isFavoriteWorkout(): (id: string) => boolean {
    return (id: string) => {
      return this.favoriteWorkouts.some(workout => workout._id === id);
    };
  }

  constructor() {
    makeObservable(this, {
      workouts: observable,
      selectedTypeFilter: observable,
      selectedDifficultyFilter: observable,
      isFavoriteWorkout: computed,
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
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const workoutStore = new WorkoutStore();
