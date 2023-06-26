import { makeObservable, observable, flow, runInAction } from 'mobx';
import { axiosClient } from '../utils/constants';
import LoggerFactory from '../utils/logger-utility';
import { ProgressProps } from '../utils/custom-types';
import moment, { Moment } from 'moment';

const logger = LoggerFactory('progress-store');

const defaultProgress = {
  traveledDistance: 0,
  timeSpent: 0,
  burntCalories: 0,
  numberOfExercises: 0,
};

export class ProgressStore {
  progress: ProgressProps = defaultProgress;
  startDate: Date | undefined = undefined;
  endDate: Date | undefined = new Date();
  displayedDate: Moment = moment();
  selectedTypeFilter: number | undefined = undefined;
  state = 'pending';

  constructor() {
    makeObservable(this, {
      progress: observable,
      startDate: observable,
      endDate: observable,
      selectedTypeFilter: observable,
      displayedDate: observable,
      fetchProgress: flow,
    });
  }

  *fetchProgress(userId: number) {
    this.state = 'pending';
    try {
      const startDateStr = this.startDate?.toISOString();
      const endDateStr = this.endDate?.toISOString();

      logger.debug(`Getting progress from ${startDateStr} to ${endDateStr}...`);

      const filters: string =
        this.selectedTypeFilter !== undefined
          ? `category=${this.selectedTypeFilter}&start=${startDateStr}&end=${endDateStr}`
          : `start=${startDateStr}&end=${endDateStr}`;

      const { data } = yield axiosClient.get<ProgressProps[]>(
        `/progress/user-progress/${userId}?${filters}`,
      );

      logger.debug(
        `Got data for progress from :  ${startDateStr} to ${endDateStr}...`,
      );
      logger.debug(data);
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
