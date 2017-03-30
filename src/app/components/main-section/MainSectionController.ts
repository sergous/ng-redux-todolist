import { Todo, initialTodo } from '../../todos/todos';
import {IScope} from 'angular';
import {clearCompleted, completeAll} from '../../actions/index';
import { INgRedux } from 'ng-redux';
import completeReducer from '../../reducers/complete';
import { SHOW_ALL } from '../../constants/TodoFilters';

const todoActions = {
  clearCompleted,
  completeAll
};

export default class MainSectionController {
  todos: Todo[];
  filter: any;

  /** @ngInject */
  constructor(
    $ngRedux: INgRedux,
    $scope: IScope
  ) {
    this.todos = [initialTodo];
    this.filter = SHOW_ALL;

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    $scope.$on('$destroy', disconnect);
    this.completedCount = this.completedCount.bind(this);
    this.activeCount = this.activeCount.bind(this);
  }

  completedCount() {
     return this.todos.reduce(completeReducer, 0);
  }

  activeCount() {
     return this.todos.length - this.todos.reduce(completeReducer, 0);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }
}
