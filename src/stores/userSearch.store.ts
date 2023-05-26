import { makeObservable, observable, action, computed } from 'mobx';
// import { observer } from 'mobx-react-lite';
import debounce from 'lodash.debounce';
import { axiosClient } from '../utils/constants';
import axios, { CancelTokenSource } from 'axios';
import LoggerFactory from '../utils/logger-utility';
import { User } from '../utils/custom-types';

const logger = LoggerFactory('user-search-store');
class SearchStore {
  query: string = '';
  results: Array<User> = [];
  isLoading: boolean = false;
  cancelTokenSource: CancelTokenSource | null = null;

  constructor() {
    makeObservable(this, {
      query: observable,
      results: observable,
      isLoading: observable,
      getSearchResults: computed,
      setSearchQuery: action,
      search: action,
    });
  }

  setSearchQuery(query: string) {
    this.query = query;
  }

  getSearchResults(): Array<User> {
    return this.results;
  }

  search = debounce(async () => {
    if (!this.query) {
      this.results = [];
      return;
    }

    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel('Request canceled');
    }

    this.isLoading = true;
    this.cancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axiosClient.get(`users?params=${this.query}`, {
        cancelToken: this.cancelTokenSource?.token,
      });
      this.results = response.data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        logger.error('Error occurred while searching:', error);
      }
    } finally {
      this.isLoading = false;
      this.cancelTokenSource = null;
    }
  }, 500);
}

export const workoutDetailStore = new SearchStore();
