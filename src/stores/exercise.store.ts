import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { Exercise, categoryMap } from '../utils/workout-types';
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
        title: exercise.name,
        content: categoryMap.get(exercise.category) || '',
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
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
