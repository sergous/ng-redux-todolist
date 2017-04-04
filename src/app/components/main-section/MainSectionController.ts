import { Todo, initialTodo } from '../../todos/todos';
import {IScope} from 'angular';
import todoActions from '../../actions/todo.actions';
import { INgRedux } from 'ng-redux';
import completeReducer from '../../reducers/complete';
import { SHOW_ALL } from '../../constants/TodoFilters';
import VisibilityFilters, { IVisibilityFilter } from '../../constants/VisibilityFilters';

export default class MainSectionController {
  todos: Todo[];
  filters = VisibilityFilters;
  selectedFilter: IVisibilityFilter;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.todos = [initialTodo];
    this.selectedFilter = VisibilityFilters[SHOW_ALL];

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    $scope.$on('$destroy', disconnect);
    this.handleCompletedCount = this.handleCompletedCount.bind(this);
    this.handleActiveCount = this.handleActiveCount.bind(this);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  handleCompletedCount() {
     return this.todos.reduce(completeReducer, 0);
  }

  handleActiveCount() {
     return this.todos.length - this.todos.reduce(completeReducer, 0);
  }
}
