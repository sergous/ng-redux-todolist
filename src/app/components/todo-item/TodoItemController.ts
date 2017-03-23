import {completeTodo, deleteTodo, editTodo} from '../../actions/index';
import {IScope} from 'angular';
import {INgRedux} from 'ng-redux';

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

  /** @ngInject */
  constructor($ngRedux: INgRedux, $scope: IScope) {
    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);

    $scope.$on('$destroy', disconnect);
  }

  handleDoubleClick() {
    this.editing = true;
  }
}
