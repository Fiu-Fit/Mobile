import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import {
  GoalInputProps,
  GoalStatus,
  GoalsProps,
  goalMap,
} from '../utils/goal-types';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';
import { axiosClient } from '../utils/constants';
import storage from '@react-native-firebase/storage';

const logger = LoggerFactory('goal-store');

const defaultGoal = {
  id: 0,
  title: '',
  description: '',
  userId: 0,
  targetValue: 0,
  deadline: new Date(),
  exerciseId: '',
  status: GoalStatus.INPROGRESS,
  multimedia: [],
};

export class GoalStore {
  goals: GoalsProps[] = [];
  currentGoal: GoalsProps = defaultGoal;
  downloads: string[] = [];
  state = 'pending';

  get cardsInfo(): CardInfo[] {
    return this.goals.map(
      (goal): CardInfo => ({
        id: goal.id,
        title: goal.title,
        content: goalMap.get(goal.status) ?? 'En progreso',
        type: 'goal',
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/fiufit-e9664.appspot.com/o/resources%2FGolden-Cup.png?alt=media&token=b9a12a35-b592-46f8-a968-8312f7df6354',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      goals: observable,
      currentGoal: observable,
      downloads: observable,
      cardsInfo: computed,
      fetchGoals: flow,
      fetchGoal: flow,
      createGoal: flow,
      deleteGoal: flow,
      editGoal: flow,
    });
  }

  get downloadList() {
    return this.downloads;
  }

  async downloadResources() {
    logger.debug('Downloading files: ', this.currentGoal.multimedia);
    this.downloads = [];
    await Promise.all(
      this.currentGoal.multimedia.map(async uri => {
        const lastSlashIndex = uri.lastIndexOf('/');
        const fileName = uri.substring(lastSlashIndex + 1);
        try {
          const download = await storage()
            .ref(`/goals/${this.currentGoal!.id}/${fileName}`)
            .getDownloadURL();
          this.downloads.push(download + uri.slice(uri.lastIndexOf('.')));
        } catch (err) {
          logger.error('Error while downloading goal multimedia:', { err });
        }
      }),
    );
  }

  async uploadResources() {
    logger.debug('Uploading files: ', this.currentGoal.multimedia);
    await Promise.all(
      this.currentGoal.multimedia.map(async uri => {
        const lastSlashIndex = uri.lastIndexOf('/');
        const fileName = uri.substring(lastSlashIndex + 1);
        try {
          await storage()
            .ref(`/goals/${this.currentGoal.id}/${fileName}`)
            .putFile(uri);
        } catch (err) {
          logger.error('Error while uploading files:', { err });
        }
      }),
    );
    logger.debug('Files uploaded!');
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

  *fetchGoal(goalId: number) {
    this.state = 'pending';
    try {
      logger.debug(`Getting goal with id ${goalId}`);
      const { data } = yield axiosClient.get<GoalsProps>(`/goals/${goalId}`);
      logger.debug('Got data: ', data);
      yield this.downloadResources();
      runInAction(() => {
        this.currentGoal = data;
        this.state = 'done';
      });
    } catch (e) {
      logger.error('Error when getting goal: ', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *createGoal(input: GoalInputProps, userId: number) {
    this.state = 'pending';
    try {
      const { targetValue, deadline, ...rest } = input;
      logger.debug('Creating goal:', { ...input, userId });
      const { data } = yield axiosClient.post('/goals', {
        ...rest,
        targetValue: Number(targetValue),
        userId,
        deadline: deadline ? deadline : undefined,
        status: GoalStatus.INPROGRESS,
        multimedia: [],
      });
      logger.debug('Got data: ', data);
      this.fetchGoals(userId);
    } catch (e) {
      logger.error('Error while creating goal:', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *deleteGoal() {
    this.state = 'pending';
    try {
      logger.debug('Deleting goal with id:', this.currentGoal?.id);
      yield axiosClient.delete(`/goals/${this.currentGoal?.id}`);
      logger.debug('Deleted goal with id:', this.currentGoal?.id);
      this.fetchGoals(this.currentGoal!.userId);
      //this.currentGoal = undefined;
    } catch (e) {
      logger.error('Error while deleting goal:', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *editGoal(newDescription: string) {
    this.state = 'pending';
    try {
      const { id, description, ...restOfGoal } = this.currentGoal!;
      const goalPayload = {
        ...restOfGoal,
        description: newDescription,
      };

      logger.debug('Old description: ', description);
      logger.debug('New media: ', this.currentGoal.multimedia);
      logger.debug('Editing goal with id: ', id);
      const { data } = yield axiosClient.put(`/goals/${id}`, {
        ...goalPayload,
      });
      logger.debug('Got data: ', data);
      yield this.uploadResources();
      yield this.fetchGoal(this.currentGoal!.id);
      yield this.fetchGoals(this.currentGoal!.userId);
    } catch (e: any) {
      logger.error('Got error while editing goal description:', { e });
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const goalStore = new GoalStore();
