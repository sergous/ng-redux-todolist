import {Todo} from '../../todos/todos';
import {IScope} from 'angular';
import {clearCompleted, completeAll} from '../../actions/index';
import { INgRedux } from 'ng-redux';
import completeReducer from '../../reducers/complete';

const todoActions = {
  clearCompleted,
  completeAll
};

export default class MainSectionController {
  todos: any[];

  /** @ngInject */
  constructor(
    $ngRedux: INgRedux,
    $scope: IScope
  ) {
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
