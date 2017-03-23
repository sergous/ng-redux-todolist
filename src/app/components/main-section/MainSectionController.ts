import {Todo} from '../../todos/todos';
import {IScope} from 'angular';
import {clearCompleted, completeAll} from '../../actions/index';
import {INgRedux} from 'ng-redux';

const todoActions = {
  clearCompleted,
  completeAll
};

export default class MainSectionController {
  completeReducer: Function;
  todos: any[];
  dispatcher: any;

  /** @ngInject */
  constructor($ngRedux: INgRedux, $scope: IScope) {
    this.completeReducer = (count: number, todo: Todo): number => todo.completed ? count + 1 : count;
    this.dispatcher = $ngRedux.dispatch;

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    $scope.$on('$destroy', disconnect);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }
}
