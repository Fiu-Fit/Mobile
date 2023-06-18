import { makeObservable, observable, flow, runInAction, computed } from 'mobx';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo, ProgressProps } from '../utils/custom-types';
import moment, { Moment } from 'moment';
import { categoryMap } from '../utils/workout-types';

const logger = LoggerFactory('progress-store');

const defaultProgress = {
  traveledDistance: 0,
  timeSpent: 0,
  burntCalories: 0,
  activityTypes: {},
};

export class ProgressStore {
  progress: ProgressProps = defaultProgress;
  startDate: Date | undefined = undefined;
  endDate: Date | undefined = undefined;
  displayedDate: Moment = moment();
  state = 'pending';

  get exerciseMetricsCardsInfo(): CardInfo[] {
    return Object.entries(this.progress.activityTypes).map(
      ([key, value]): CardInfo => ({
        id: '0',
        title: categoryMap.get(Number(key)) || 'Desconocido',
        content: value.toString(),
        imageUrl:
          'https://static.vecteezy.com/system/resources/previews/009/665/172/original/man-doing-sit-up-exercise-for-abdominal-muscles-vector-young-boy-wearing-a-blue-shirt-flat-character-athletic-man-doing-sit-ups-for-the-belly-and-abdominal-exercises-men-doing-crunches-in-the-gym-free-png.png',
      }),
    );
  }

  constructor() {
    makeObservable(this, {
      progress: observable,
      startDate: observable,
      endDate: observable,
      displayedDate: observable,
      exerciseMetricsCardsInfo: computed,
      fetchProgress: flow,
    });
  }

  *fetchProgress(userId: number) {
    this.state = 'pending';
    try {
      const startDateStr = this.startDate?.toISOString();
      const endDateStr = this.endDate?.toISOString();
      logger.debug(`Getting progress from ${startDateStr} to ${endDateStr}...`);

      /*const { data } = yield axiosClient.get<ProgressProps[]>(
        `/progress/user-progress/${userId}?start=${startDateStr}&end=${endDateStr}`,
      );*/
      const data: ProgressProps = {
        traveledDistance: 100,
        timeSpent: 400,
        burntCalories: 575,
        activityTypes: {
          0: 1,
          4: 1,
          5: 2,
        },
      };
      logger.debug('Got data: ', data);
      runInAction(() => {
        this.progress = data;
        this.state = 'done';
      });
    } catch (e) {
      runInAction(() => {
        this.state = 'error';
      });
    }
  }
}

export const progressStore = new ProgressStore();
