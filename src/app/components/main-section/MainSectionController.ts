import { Todo, initialTodo } from '../../todos/todos';
import {IScope} from 'angular';
import todoActions from '../../actions/todo.actions';
import { INgRedux } from 'ng-redux';
import completeReducer from '../../reducers/complete';
import { SHOW_ALL } from '../../constants/TodoFilters';
import VisibilityFilters, { IVisibilityFilter, listIdFilter } from '../../constants/VisibilityFilters';
import { logoutUser } from "../../actions/auth.actions";

export default class MainSectionController {
  todos: Todo[];
  listId: number;
  filters = VisibilityFilters;
  listIdFilter = listIdFilter;
  selectedFilter: IVisibilityFilter;
  isConfig: boolean;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.listId = 0;
    this.todos = [initialTodo];
    this.selectedFilter = VisibilityFilters[SHOW_ALL];

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      {logoutUser, ...todoActions}
    )(this);

    $scope.$on('$destroy', disconnect);
    this.handleCompletedCount = this.handleCompletedCount.bind(this);
    this.handleActiveCount = this.handleActiveCount.bind(this);
    this.handleSelectList = this.handleSelectList.bind(this);
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

  handleSelectList(listId: number) {
     this.listId = listId;
  }
}
