import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { Exercise, categoryMap, imageMap } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';

const logger = LoggerFactory('exercise-store');

export class ExerciseStore {
  exercises: Exercise[] = [];
  state = 'pending';

  get cardsInfo(): CardInfo[] {
    return this.exercises.map(
      (exercise): CardInfo => ({
        id: exercise._id,
        title: exercise.name ?? 'Name missing',
        content: categoryMap.get(exercise.category ?? '') || '',
        type: 'exercise',
        imageUrl:
          imageMap.get(exercise.category) || require('../imgs/error.png'),
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      exercises: observable,
      cardsInfo: computed,
      fetchExercises: flow,
    });
  }

  *fetchExercises() {
    this.state = 'pending';
    try {
      logger.debug('Getting exercises...');
      const { data } = yield axiosClient.get<Exercise[]>('/exercises');
      logger.debug('Got data from goals: ', data);
      runInAction(() => {
        this.exercises = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const exerciseStore = new ExerciseStore();
