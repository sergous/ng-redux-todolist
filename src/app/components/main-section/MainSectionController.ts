import { Todo, initialTodo } from '../../todos/todos';
import {IScope} from 'angular';
import { clearCompleted, completeAll, deleteTodo, editTodo, addTodo } from '../../actions/index';
import { INgRedux } from 'ng-redux';
import completeReducer from '../../reducers/complete';
import { SHOW_ALL } from '../../constants/TodoFilters';

const todoActions = {
  clearCompleted,
  completeAll,
  deleteTodo,
  editTodo,
  addTodo
};

export default class MainSectionController {
  todos: Todo[];
  filter: any;

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
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
    this.handleAdd = this.handleAdd.bind(this);
  }

  completedCount() {
     return this.todos.reduce(completeReducer, 0);
  }

  activeCount() {
     return this.todos.length - this.todos.reduce(completeReducer, 0);
  }

  handleAdd(text: string) {
    if (text.length === 0) { return; };
    this.todos = this.$ngRedux.dispatch(todoActions.addTodo(text));
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }
}
