import { Todo, initialTodo } from '../../todos/todos';
import {IScope} from 'angular';
import todoActions from '../../actions/index';
import { INgRedux } from 'ng-redux';
import completeReducer from '../../reducers/complete';
import { SHOW_ALL } from '../../constants/TodoFilters';
import VisibilityFilters from '../../constants/VisibilityFilters';

export default class MainSectionController {
  todos: Todo[];
  filter: any;
  selectedFilter: any;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope,
    $transitions: any,
    $state: any
  ) {
    this.todos = [initialTodo];
    this.filter = SHOW_ALL;
    this.selectedFilter = VisibilityFilters['show_' + $state.current.name] || VisibilityFilters[SHOW_ALL];

    let updateFilter = (trans) => {
      let state = trans.router.stateService;
      const newFilterName = state.current.url;
      this.handleSetFilter(newFilterName);
    };
    $transitions.onSuccess({ }, updateFilter.bind(this));

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    $scope.$on('$destroy', disconnect);
    this.completedCount = this.completedCount.bind(this);
    this.activeCount = this.activeCount.bind(this);
    this.handleSetFilter = this.handleSetFilter.bind(this);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  completedCount() {
     return this.todos.reduce(completeReducer, 0);
  }

  activeCount() {
     return this.todos.length - this.todos.reduce(completeReducer, 0);
  }

  handleSetFilter(filter: string) {
    this.selectedFilter = VisibilityFilters['show_' + filter];
  }
}
