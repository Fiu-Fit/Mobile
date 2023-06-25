import { makeObservable, observable, computed, flow, runInAction } from 'mobx';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo } from '../utils/custom-types';
import {
  GOAL_NOTIFICATION_CONTENT,
  GOAL_NOTIFICATION_TITLE,
  MESSAGE_NOTIFICATION_CONTENT,
  MESSAGE_NOTIFICATION_TITLE,
  GoalNotificationProps,
  MessageNotificationProps,
} from '../utils/notification-types';

const logger = LoggerFactory('notification-store');

export class NotificationStore {
  notifications: (GoalNotificationProps | MessageNotificationProps)[] = [];
  state = 'pending';

  get notificationCount() {
    return this.notifications.length;
  }

  get notificationCardsInfo(): CardInfo[] {
    return this.notifications.map((notification): CardInfo => {
      if ('goalTitle' in notification) {
        const goalNotification = notification as GoalNotificationProps;
        return {
          id: goalNotification.goalId,
          title: GOAL_NOTIFICATION_TITLE,
          content: GOAL_NOTIFICATION_CONTENT(goalNotification.goalTitle),
          imageUrl:
            'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
          onPressScreen: 'GoalScreen',
        };
      } else {
        const messageNotification = notification as MessageNotificationProps;
        return {
          id: messageNotification.senderId,
          title: MESSAGE_NOTIFICATION_TITLE,
          content: MESSAGE_NOTIFICATION_CONTENT(messageNotification.senderName),
          imageUrl:
            'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
          onPressScreen: 'ChatScreen',
        };
      }
    });
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
      logger.debug('Getting goal notifications...');
      const { data } = yield axiosClient.get<GoalNotificationProps[]>(
        `/notifications/goals?userId=${userId}`,
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
      const { data } = yield axiosClient.get<MessageNotificationProps[]>(
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
