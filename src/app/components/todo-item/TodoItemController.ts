import {completeTodo, deleteTodo, editTodo} from '../../actions/index';
import {IScope} from 'angular';

const todoActions = {
  editTodo,
  deleteTodo,
  completeTodo
};

export default class TodoItemController {
  editing: boolean = false;
  todo: any;

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  constructor($ngRedux: any, $scope: IScope) {
    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    $scope.$on('$destroy', disconnect);
  }

  handleDoubleClick() {
    this.editing = true;
  }
}