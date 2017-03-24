import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import Header from './';
import {Todo} from '../../todos/todos';
import HeaderController from './HeaderController';
import rootReducer from '../../reducers/index';
import {List} from 'immutable';
import {addTodo, deleteAll, deleteTodo} from '../../actions/index';

describe('Header component', () => {
  let todos: Todo[];
  let defaultState;
  let store;

  beforeEach(() => {
    todos = [
      {
        text: 'Use ngrx/store',
        completed: false,
        id: 0
      }
    ];

    defaultState = {
      todos
    };

    angular
      .module('headerComponent', [ngRedux, 'app/components/header/Header.html'])
      .component('headerComponent', Header)
      .controller('HeaderController', HeaderController)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          rootReducer
        );
      });

    angular.mock.module('headerComponent');

  });

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const element = $compile('<header-component></header-component>')($rootScope);
    $rootScope.$digest();
    const header = element.find('h1');
    expect(header.html().trim()).toEqual('todos');
  }));

  it('should get the todos binded to the component', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $componentController) => {
    const component = $componentController('headerComponent', {}, {todos});
    expect(component.todos.length).toEqual(1);
  }));

  it('should remove todo to the component', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $componentController) => {
    const component = $componentController('headerComponent', {}, {todos});
    expect(component.todos.length).toEqual(1);
    component.dispatcher(deleteTodo(0));
    expect(component.todos.length).toEqual(0);
  }));

  it('should add todo to the component', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $componentController) => {
    const component = $componentController('headerComponent', {}, {todos});
    expect(component.todos.length).toEqual(1);
    component.dispatcher(addTodo('New Task'));
    expect(component.todos.length).toEqual(2);
  }));

  it('should call onUpdate on add new todo to the component', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $componentController) => {
    const component = $componentController('headerComponent', {}, {todos});
    component.dispatcher(deleteAll());
    component.dispatcher(addTodo(todos[0].text));
    const newState = List(todos).push({text: 'New Task', id: 1, completed: false}).toArray();
    expect(component.todos.length).toEqual(1);
    spyOn(component, 'handleSave').and.callThrough();
    spyOn(component, 'onUpdate').and.callThrough();
    component.handleSave('New Task');
    expect(component.handleSave).toHaveBeenCalledWith('New Task');
    expect(component.onUpdate).toHaveBeenCalledWith({todos: newState.reverse()});
  }));
});
