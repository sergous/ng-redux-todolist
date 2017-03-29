import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../../constants/TodoFilters';

export default class FooterController {
  filters: string[];
  filterTitles: any;
  filterStates: any;

  /** @ngInject */
  constructor(
    public $state: any
  ) {
    this.filters = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED];
    this.filterTitles = {
      [SHOW_ALL]: 'All',
      [SHOW_ACTIVE]: 'Active',
      [SHOW_COMPLETED]: 'Completed'
    };
    this.filterStates = {
      [SHOW_ALL]: '.all',
      [SHOW_ACTIVE]: '.active',
      [SHOW_COMPLETED]: '.completed'
    };
  }

  handleSetFilter(filter: string) {
    this.$state.go('main.todos' + this.filterStates[filter]);
  }
}
