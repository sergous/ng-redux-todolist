import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import Header from './';
import {Todo} from '../../todos/todos';
import HeaderController from './HeaderController';
import rootReducer from '../../reducers/index';

describe('Header component', () => {
  let todos: Todo[];
  let defaultState;
  let store;
  let targetObj;
  let connect;

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
    spyOn(component, 'handleSave').and.callThrough();
    expect(component.todos.length).toEqual(1);
    component.handleSave('New Task');
    expect(component.handleSave).toHaveBeenCalledWith('New Task');
    expect(component.todos.length).toEqual(2);
  }));
});
