import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { GoalsProps } from '../utils/goal-types';
import LoggerFactory from '../utils/logger-utility';
import { ICard } from '../utils/custom-types';

const logger = LoggerFactory('goal-store');

export class GoalStore {
  goals: GoalsProps[] = [];
  state = 'pending';

  get cardsInfo(): ICard[] {
    return this.goals.map(
      (goal): ICard => ({
        id: goal.id,
        title: goal.title,
        content: goal.status,
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      goals: observable,
      cardsInfo: computed,
      fetchGoals: flow,
    });
    this.fetchGoals();
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
