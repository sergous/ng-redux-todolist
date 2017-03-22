import visibilityFilters from '../../constants/VisibilityFilters';
import {Todo} from '../../todos/todos';
import {IScope} from 'angular';
import {completeTodo, deleteTodo, editTodo, clearCompleted, completeAll} from '../../actions/index';

const todoActions = {
  editTodo,
  deleteTodo,
  completeTodo,
  clearCompleted,
  completeAll
};

export default class MainSectionController {
  selectedFilter: any;
  filter: string;
  completeReducer: Function;
  todos: any[];
  dispatcher: any;

  /** @ngInject */
  constructor($ngRedux: any, $scope: IScope) {
    this.selectedFilter = visibilityFilters[this.filter];
    this.completeReducer = (count: number, todo: Todo): number => todo.completed ? count + 1 : count;
    this.dispatcher = $ngRedux.dispatch;

    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    this.handleSetFilter = this.handleSetFilter.bind(this);
    this.handleSave = this.handleSave.bind(this);

    $scope.$on('$destroy', disconnect);
  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  handleSetFilter(filter: string) {
    this.filter = filter;
    this.selectedFilter = visibilityFilters[filter];
  }

  handleSave(e: any) {
    if (e.text.length === 0) {
      this.todos = this.dispatcher(deleteTodo(e.id));
    } else {
      this.todos = this.dispatcher(editTodo(e.id, e.text));
    }
  }
}
