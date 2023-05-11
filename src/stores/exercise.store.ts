import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { Exercise } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { ICard } from '../utils/custom-types';

const logger = LoggerFactory('exercise-store');

export class ExerciseStore {
  exercises: Exercise[] = [];
  state = 'pending';

  get cardsInfo(): ICard[] {
    return this.exercises.map(
      (exercise): ICard => ({
        id: exercise._id,
        title: exercise.name,
        content: exercise.category,
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      exercises: observable,
      cardsInfo: computed,
      fetchExercises: flow,
    });
    this.fetchExercises();
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
