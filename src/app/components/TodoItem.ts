import {completeTodo, deleteTodo, editTodo} from '../actions/index';
import {IScope} from 'angular';

const todoActions = {
  editTodo,
  deleteTodo,
  completeTodo
};

class TodoItemController {
  editing: boolean = false;
  todo: any;

  static onUpdate(state: any) {
    return {
      todo: state.todo
    };
  }

  constructor($ngRedux: any, $scope: IScope) {
    let disconnect = $ngRedux.connect(
      state => TodoItemController.onUpdate(state),
      todoActions
    )(this);

    $scope.$on('$destroy', disconnect);
  }

  handleDoubleClick() {
    this.editing = true;
  }
}

export const TodoItem: angular.IComponentOptions = {
  template: require('./TodoItem.html'),
  controller: TodoItemController,
  bindings: {
    todo: '<',
  }
};
