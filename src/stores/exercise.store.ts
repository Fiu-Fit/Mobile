import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { ExerciseInfo } from '../utils/workout-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';

const logger = LoggerFactory('workout-store');

export class ExerciseStore {
  exercise: ExerciseInfo = {
    exerciseId: '',
    name: '',
    description: '',
    category: -1,
  };
  state = 'pending';

  get exerciseInfo(): ExerciseInfo {
    return this.exercise;
  }

  constructor(exerciseId: string) {
    makeObservable(this, {
      exercise: observable,
      exerciseInfo: computed,
      fetchExercise: flow,
    });
    this.fetchExercise(exerciseId);
  }

  *fetchExercise(exerciseId: string) {
    this.exercise = {
      exerciseId: '',
      name: '',
      description: '',
      category: -1,
    };
    this.state = 'pending';
    try {
      logger.debug('Getting exercise...');
      const { data } = yield axiosClient.get<ExerciseInfo>(
        `/exercises/${exerciseId}`,
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.exercise = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
