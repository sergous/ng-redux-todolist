import {INgRedux} from 'ng-redux';
import {Todo} from '../../todos/todos';
import {addTodo} from '../../actions/index';
import {IScope} from 'angular';

const todoActions = {
  addTodo,
};

export default class HeaderController {
  todos: Todo[];

  /** @ngInject */
  constructor(
    public $ngRedux: INgRedux,
    $scope: IScope
  ) {
    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    this.handleSave = this.handleSave.bind(this);

    $scope.$on('$destroy', disconnect);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.todos = this.$ngRedux.dispatch(addTodo(text));
    }
  }
}
