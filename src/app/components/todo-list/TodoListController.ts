import VisibilityFilters from '../../constants/VisibilityFilters';
import {IScope} from 'angular';
import {completeTodo, deleteTodo, editTodo} from '../../actions/index';
import {SHOW_ALL} from '../../constants/TodoFilters';
import {INgRedux} from 'ng-redux';

const todoActions = {
  editTodo,
  deleteTodo,
  completeTodo,
};

export default class TodoListController {
  selectedFilter: any;
  todos: any[];
  dispatcher: any;

  /** @ngInject */
  constructor($ngRedux: INgRedux, $scope: IScope, $transitions: any, $state: any) {
    this.selectedFilter = VisibilityFilters['show_' + $state.current.name] || VisibilityFilters[SHOW_ALL];
    this.dispatcher = $ngRedux.dispatch;
    let disconnect = $ngRedux.connect(
      state => this.onUpdate(state),
      todoActions
    )(this);

    this.handleSave = this.handleSave.bind(this);
    this.handleSetFilter = this.handleSetFilter.bind(this);

    $scope.$on('$destroy', disconnect);

    let updateFilter = (trans) => {
      let state = trans.router.stateService;
      const newFilterName = state.current.url;
      this.handleSetFilter(newFilterName);
    };
    $transitions.onSuccess({ }, updateFilter.bind(this));

  }

  onUpdate(state: any) {
    return {
      todos: state.todos
    };
  }

  handleSetFilter(filter: string) {
    this.selectedFilter = VisibilityFilters['show_' + filter];
  }

  handleSave(e: any) {
    if (e.text.length === 0) {
      this.todos = this.dispatcher(deleteTodo(e.id));
    } else {
      this.todos = this.dispatcher(editTodo(e.id, e.text));
    }
  }

}
