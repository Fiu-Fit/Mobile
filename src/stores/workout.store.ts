import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import {
  CategoryType,
  WorkoutProps,
  categoryMap,
} from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';
import {
  dumpWorkout1,
  dumpWorkout2,
  dumpWorkout3,
} from '../utils/dump-workouts';

const logger = LoggerFactory('workout-store');

const dumpWorkouts: WorkoutProps[] = [dumpWorkout1, dumpWorkout2, dumpWorkout3];
const favouriteDumpWorkouts: WorkoutProps[] = [dumpWorkout2, dumpWorkout3];

export class WorkoutStore {
  allWorkouts: WorkoutProps[] = [];
  favouriteWorkouts: WorkoutProps[] = [];
  showingAllWorkouts: boolean = false;
  state = 'pending';

  get allWorkoutCount() {
    return this.allWorkouts.length;
  }

  get favouriteWorkoutCount() {
    return this.favouriteWorkouts.length;
  }

  get isShowingAllWorkouts(): boolean {
    return this.isShowingAllWorkouts;
  }

  get workoutCardsInfo(): CardInfo[] {
    const workouts = this.showingAllWorkouts
      ? this.allWorkouts
      : this.favouriteWorkouts;
    return workouts.map(
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
      allWorkouts: observable,
      favouriteWorkouts: observable,
      showingAllWorkouts: observable,
      isShowingAllWorkouts: computed,
      allWorkoutCount: computed,
      favouriteWorkoutCount: computed,
      workoutCardsInfo: computed,
      fetchWorkouts: flow,
      fetchFavoriteWorkouts: flow,
    });
  }

  *fetchWorkouts() {
    this.allWorkouts = [];
    this.state = 'pending';
    try {
      logger.debug('Getting workouts...');
      //const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts');
      const data = dumpWorkouts;
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.allWorkouts = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *fetchFavoriteWorkouts(userId: string) {
    this.favouriteWorkouts = [];
    this.state = 'pending';
    try {
      logger.debug(`Getting favorite workouts for id ${userId}...`);
      //const { data } = yield axiosClient.get<WorkoutProps[]>('/workouts');
      const data = favouriteDumpWorkouts;
      logger.debug(`Got data for user: ${userId}`, data);
      runInAction(() => {
        this.favouriteWorkouts = data;
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
