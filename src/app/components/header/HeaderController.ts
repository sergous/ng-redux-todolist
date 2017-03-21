import {Todo} from '../../todos/todos';
import {addTodo} from '../../actions/index';
import IScope = angular.IScope;

const todoActions = {
  addTodo,
};

export default class HeaderController {
  todos: Todo[];
  dispatcher: any;

  /** @ngInject */
  constructor($ngRedux: any, $scope: IScope) {
    this.dispatcher = $ngRedux.dispatch;

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    //noinspection TypeScriptUnresolvedFunction
    $scope.$on('$destroy', disconnect);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.todos = this.dispatcher(addTodo(text));
    }
  }
}
