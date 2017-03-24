import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import TodoList from './';
import rootReducer from '../../reducers/index';
import TodoListController from './TodoListController';
import {SHOW_COMPLETED} from '../../constants/TodoFilters';

describe('TodoList component', () => {
  let component;

  beforeEach(() => {
    angular
      .module('todoList', [ngRedux, uiRouter, 'app/components/todo-list/TodoList.html'])
      .component('todoList', TodoList)
      .controller('TodoListController', TodoListController)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          rootReducer
        );
      });
    angular.mock.module('todoList');
  });

  beforeEach(angular.mock.inject(($transitions, $componentController) => {
    component = $componentController('todoList', {}, {});
  }));

  it('shoud call completeTodo', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeTodo(0);
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud call deleteTodo with empty text', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.handleSave({id: 0, text: ''});
    expect(component.onUpdate).toHaveBeenCalled();
  });


  it('shoud call editTodo with text', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.handleSave({id: 0, text: 'Hello'});
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud delete todo', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.deleteTodo(0);
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud set selectedFilter', () => {
    component.handleSetFilter('completed');
    expect(component.selectedFilter.type).toEqual(SHOW_COMPLETED);
    expect(component.selectedFilter.filter({completed: true})).toEqual(true);
  });
});
