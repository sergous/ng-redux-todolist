import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import {combineReducers} from 'redux';
import todos from '../../reducers/todos';
import MainSection from './';
import { Todo } from '../../todos/todos';
import { SHOW_COMPLETED } from '../../constants/TodoFilters';

const todosReducer = combineReducers({
  todos
});

describe('MainSection controller', () => {
  let component;
  const todos = [
    {id: 0, text: 'Active task', completed: false},
    {id: 1, text: 'Done task', completed: true}
  ];
  const newTodo: Todo = {id: 0, text: 'New todo', completed: false};

  beforeEach(() => {
    angular
      .module('mainSection', [ngRedux, 'app/components/main-section/MainSection.html'])
      .component('mainSection', MainSection)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          todosReducer
        );
      });
    angular.mock.module('mainSection');
  });

  beforeEach(angular.mock.inject($componentController => {
    component = $componentController('mainSection', {}, {});
    component.deleteAll();
  }));

  it('should call add Todo', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.addTodo(newTodo.text);
    expect(component.onUpdate).toHaveBeenCalledWith({todos: [newTodo]});
  });

  it('shoud call completeTodo', () => {
    component.addTodo(newTodo.text);
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeTodo(0);
    const doneTodo = Object.assign(newTodo, {completed: true});
    expect(component.onUpdate).toHaveBeenCalledWith({todos: [doneTodo]});
  });

  it('shoud delete todo', () => {
    component.addTodo(newTodo.text);
    spyOn(component, 'onUpdate').and.callThrough();
    component.deleteTodo(0);
    expect(component.onUpdate).toHaveBeenCalledWith({todos: []});
  });

  it('shoud call completeAll', () => {
    component.addTodo(newTodo.text);
    const doneTodo = Object.assign(newTodo, {completed: true});
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeAll();
    expect(component.onUpdate).toHaveBeenCalledWith({todos: [doneTodo]});
  });

  it('shoud call clearCompleted', () => {
    component.addTodo(newTodo.text);
    component.completeTodo(0);
    spyOn(component, 'onUpdate').and.callThrough();
    component.clearCompleted();
    expect(component.onUpdate).toHaveBeenCalledWith({todos: []});
  });

  describe('counters', () => {
    it('shoud call handleActiveCount', angular.mock.inject($componentController => {
      const bindings = { todos };
      const component = $componentController('mainSection', {}, bindings);
      const active = component.handleActiveCount();
      expect(active).toEqual(1);
    }));

    it('shoud call handleCompletedCount', angular.mock.inject($componentController => {
      const bindings = { todos };
      const component = $componentController('mainSection', {}, bindings);
      const completed = component.handleCompletedCount();
      expect(completed).toEqual(1);
    }));
});
});
