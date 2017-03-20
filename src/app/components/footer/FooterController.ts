import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../../constants/TodoFilters';

export default class FooterController {
  filters: string[];
  filterTitles: any;

  constructor() {
    this.filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
    this.filterTitles = {
      [SHOW_ALL]: 'All',
      [SHOW_ACTIVE]: 'Active',
      [SHOW_COMPLETED]: 'Completed'
    };
  }
}
