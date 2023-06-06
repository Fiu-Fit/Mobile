import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { NotificationProps } from '../utils/notification-types';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo, RequireAtLeastOne } from '../utils/custom-types';

const logger = LoggerFactory('notification-store');

export class NotificationStore {
  notifications: RequireAtLeastOne<
    NotificationProps,
    'messageId' | 'goalId'
  >[] = [];
  state = 'pending';

  get notificationCount() {
    return this.notifications.length;
  }

  get notificationCardsInfo(): CardInfo[] {
    return this.notifications.map(
      (notification): CardInfo => ({
        id: notification._id,
        title: notification.goalId ? 'Meta Cumplida' : 'Nuevo Mensaje',
        content: 'Detalles',
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
        onPressScreen: notification.goalId ? 'GoalScreen' : 'MessageScreen',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      notifications: observable,
      notificationCount: computed,
      notificationCardsInfo: computed,
      fetchGoalNotifications: flow,
      fetchMessageNotifications: flow,
    });
  }

  *fetchGoalNotifications(userId: number) {
    this.notifications = [];
    this.state = 'pending';
    try {
      const filters = {
        userId: userId,
      };

      const params = {
        filters: JSON.stringify(filters),
      };
      logger.debug('Getting goal notifications...');
      const { data } = yield axiosClient.get<NotificationProps[]>(
        '/notifications/goals',
        {
          params,
        },
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.notifications = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }

  *fetchMessageNotifications(userId: number) {
    this.notifications = [];
    this.state = 'pending';
    try {
      const filters = {
        userId: userId,
      };

      const params = {
        filters: JSON.stringify(filters),
      };
      logger.debug('Getting message notifications...');
      const { data } = yield axiosClient.get<NotificationProps[]>(
        '/notifications/message',
        {
          params,
        },
      );
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.notifications = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const notificationStore = new NotificationStore();
