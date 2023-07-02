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
  NotificationType,
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
          type: NotificationType.GoalCompleted.toString(),
          imageUrl: require('../imgs/error.png'),
          onPressScreen: 'GoalScreen',
        };
      } else {
        const messageNotification = notification as MessageNotificationProps;
        return {
          id: messageNotification.senderId,
          title: MESSAGE_NOTIFICATION_TITLE,
          content: MESSAGE_NOTIFICATION_CONTENT(messageNotification.senderName),
          type: NotificationType.NewMessage.toString(),
          imageUrl: require('../imgs/error.png'),
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
      logger.debug('Getting message notifications...');
      const { data } = yield axiosClient.get<MessageNotificationProps[]>(
        `/notifications/messages?userId=${userId}`);
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
