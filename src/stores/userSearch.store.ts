import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from 'mobx';
// import { observer } from 'mobx-react-lite';
import debounce from 'lodash.debounce';
import { axiosClient } from '../utils/constants';
import axios, { CancelTokenSource } from 'axios';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo, User } from '../utils/custom-types';

const logger = LoggerFactory('user-search-store');

type FilterOprions = 'name' | 'distance';

class SearchStore {
  query: string = '';
  lastQuery: string | undefined = undefined;
  results: User[] = [];
  isLoading: boolean = false;
  cancelTokenSource: CancelTokenSource | undefined = undefined;
  distance: number | undefined = undefined;
  lastDistance: number | undefined = undefined;
  filterOption: FilterOprions = 'name';


  constructor() {
    makeObservable(this, {
      query: observable,
      distance: observable,
      results: observable,
      filterOption: observable,
      cardsInfo: computed,
      isLoading: observable,
      setSearchQuery: action,
      setDistanceSearch: action,
      searchByName: action,
      switchSearchCriteria: action,
    });
  }

  setSearchQuery(query: string) {
    this.query = query;
  }

  setDistanceSearch(distance: number){
    this.distance = distance;
  }

  switchSearchCriteria(criteria: FilterOprions){
      if(criteria === 'name'){
        this.lastDistance = undefined;
        this.distance = undefined;
      }
      if(criteria === 'distance'){
        this.query = '';
        this.lastQuery = undefined;
      }
      this.filterOption = criteria;

  }

  get cardsInfo(): CardInfo[] {
    logger.info('Results in getCardsInfo: ', this.results);
    return this.results?.map(
      (result): CardInfo => ({
        id: result.id.toString(),
        title: `${result.firstName} ${result.lastName}`,
        content: result.email,
        imageUrl:
          'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
      }),
    );
  }

  searchByName = debounce(async () => {
    if (!this.query || (this.lastQuery && this.lastQuery === this.query)) return;
    
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('Request canceled');
    }

    runInAction(() => {
      this.isLoading = true;
      this.lastQuery = this.query;
    });
    this.cancelTokenSource = axios.CancelToken.source();
    this.results = [];
    try {
      const response = await axiosClient.get(`/users?params=${this.query}`, {
        cancelToken: this.cancelTokenSource?.token,
      });
      logger.info('Response: ', response);

      runInAction(() => {
        logger.info('Setting: ', response.data);
        this.results = response?.data.rows ?? [];
      });
    } catch (error) {
      if (!axios.isCancel(error)) {
        logger.error('Error occurred while searching:', error);
        runInAction(() => {
          logger.info('Setting: ', []);
          this.results = [];
        });
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.cancelTokenSource = undefined;
      });
    }
  }, 500);

  searchByDistance = debounce(async (id: number) => {
    
    if (!this.distance || (this.lastDistance && this.lastDistance === this.distance)) return;

    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('Request canceled');
    }

    runInAction(() => {
      this.isLoading = true;
      this.lastDistance = this.distance;
    });
    this.cancelTokenSource = axios.CancelToken.source();
    this.results = [];
    try {
      const response = await axiosClient.get(`/users/${id}/nearest-trainers?radius=${this.distance}`, {
        cancelToken: this.cancelTokenSource?.token,
      });
      logger.info('Response: ', response);

      runInAction(() => {
        logger.info('Setting: ', response.data);
        this.results = response?.data.rows ?? [];
      });
    } catch (error) {
      if (!axios.isCancel(error)) {
        logger.error('Error occurred while searching:', error);
        runInAction(() => {
          logger.info('Setting: ', []);
          this.results = [];
        });
      }
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.cancelTokenSource = undefined;
      });
    }
  }, 500);
}

export const searchStore = new SearchStore();
