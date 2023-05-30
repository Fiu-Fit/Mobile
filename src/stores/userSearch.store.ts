import { makeObservable, observable, action, computed } from 'mobx';
// import { observer } from 'mobx-react-lite';
import debounce from 'lodash.debounce';
import { axiosClient } from '../utils/constants';
import axios, { CancelTokenSource } from 'axios';
import LoggerFactory from '../utils/logger-utility';
import { CardInfo, User } from '../utils/custom-types';

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
      searchResults: computed,
      searchQuery: computed,
      cardsInfo: computed,
      isLoading: observable,
      setSearchQuery: action,
      search: action,
    });
  }

  setSearchQuery(query: string) {
    this.query = query;
  }

  get searchResults(): Array<User> {
    return this.results;
  }

  get searchQuery(): string {
    return this.query;
  }

  get cardsInfo(): CardInfo[] {
    return this.results.map(
      (result): CardInfo => ({
        id: result.id.toString(),
        title: `${result.firstName} ${result.lastName}`,
        content: result.email,
        imageUrl:
          'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
      }),
    );
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
    this.results = [];
    // try {
    //   const response = await axiosClient.get(`/users?params=${this.query}`, {
    //     cancelToken: this.cancelTokenSource?.token,
    //   });
    //   this.results = response.data;
    // } catch (error) {
    //   if (!axios.isCancel(error)) {
    //     logger.error('Error occurred while searching:', error);
    //   }
    // } finally {
    //   this.isLoading = false;
    //   this.cancelTokenSource = null;
    // }
  }, 500);
}

export const searchStore = new SearchStore();
