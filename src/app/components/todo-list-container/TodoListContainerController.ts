import {SHOW_ACTIVE, SHOW_ALL} from '../../constants/TodoFilters';
import {initialTodo, Todo} from '../../todos/todos';
import IScope = angular.IScope;

export default class TodoListContainerController {
  todos: Todo[];
  filter: string;

  constructor(
    $ngRedux: any,
    $scope: IScope
  ) {
    this.todos = [initialTodo];
    this.filter = SHOW_ALL;

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state)
    )(this);

    $scope.$on('$destroy', disconnect);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }
}
