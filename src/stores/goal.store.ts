import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { GoalInputProps, GoalStatus, GoalsProps } from '../utils/goal-types';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';
import { axiosClient } from '../utils/constants';

const logger = LoggerFactory('goal-store');

export class GoalStore {
  goals: GoalsProps[] = [];
  currentGoal: GoalsProps | undefined = undefined;
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
      fetchGoal: flow,
      createGoal: flow,
    });
  }

  *fetchGoals(userId: number) {
    this.goals = [];
    this.state = 'pending';
    try {
      logger.debug('Getting Goals...');
      const { data } = yield axiosClient.get<GoalsProps[]>(
        `/goals?userId=${userId}`,
      );
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

  *fetchGoal(goalId: string) {
    this.currentGoal = undefined;
    this.state = 'pending';
    try {
      logger.debug(`Getting goal with id ${goalId}`);
      const { data } = yield axiosClient.get<GoalsProps>(`/goals/${goalId}`);
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.currentGoal = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *createGoal(input: GoalInputProps, userId: number) {
    this.state = 'pending';
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { targetValue, deadline, ...rest } = input;
      logger.debug('Creating goal:', { ...input, userId });
      const { data } = yield axiosClient.post('/goals', {
        ...rest,
        targetValue: Number(targetValue),
        userId,
        deadline: deadline ? deadline : undefined,
        status: GoalStatus.INPROGRESS,
      });
      logger.debug('Got data: ', data);
    } catch (e: any) {
      logger.error('Error while creating goal:', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const goalStore = new GoalStore();
