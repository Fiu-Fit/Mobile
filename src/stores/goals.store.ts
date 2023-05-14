import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { GoalsProps } from '../utils/goal-types';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';

const logger = LoggerFactory('goal-store');

export class GoalStore {
  goals: GoalsProps[] = [];
  state = 'pending';

  get cardsInfo(): CardInfo[] {
    return this.goals.map(
      (goal): CardInfo => ({
        id: goal.id,
        title: goal.title,
        content: goal.status,
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      goals: observable,
      cardsInfo: computed,
      fetchGoals: flow,
    });
  }

  *fetchGoals() {
    this.goals = [];
    this.state = 'pending';
    try {
      logger.debug('Getting Goals...');
      //const { data } = yield axiosClient.get<GoalsProps[]>('/goals?userId=1');
      const data = [
        {
          id: '1',
          title: 'Hacer flexiones',
          description: 'desc',
          userId: 1,
          targetValue: 200,
          deadline: new Date('2021-12-31'),
          exerciseId: '1',
          status: 'Pendiente',
        },
        {
          id: '2',
          title: 'Hacer abdominales',
          description: 'desc',
          userId: 1,
          targetValue: 200,
          deadline: new Date('2021-12-31'),
          exerciseId: '1',
          status: 'Pendiente',
        },
      ];
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.goals = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}
