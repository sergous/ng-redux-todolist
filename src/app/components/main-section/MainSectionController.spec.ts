import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import {combineReducers} from 'redux';
import todos from '../../reducers/todos';
import MainSection from './';
import { ITodo } from "../../interfaces";
import { SHOW_COMPLETED } from '../../constants/TodoFilters';

const todosReducer = combineReducers({todos});
const MAIN = 'mainSection';

describe(MAIN, () => {
  let component;
  const todos: ITodo[] = [
    {id: 0, text: 'Active task', completed: false, listId: 0},
    {id: 1, text: 'Done task', completed: true, listId: 0}
  ];
  const newTodo: ITodo = {id: 0, text: 'New todo', completed: false, listId: 0};

  beforeEach(() => {
    angular
      .module(MAIN, [ngRedux])
      .component(MAIN, MainSection)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          todosReducer
        );
      });
    angular.mock.module(MAIN);
  });

  beforeEach(angular.mock.inject($componentController => {
    component = $componentController(MAIN, {}, {});
    component.deleteAll();
  }));

  it('should call add Todo', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.addTodo(newTodo.text, 0);
    expect(component.onUpdate).toHaveBeenCalledWith({todos: [newTodo]});
  });

  it('shoud call completeTodo', () => {
    component.addTodo(newTodo.text, 0);
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeTodo(0);
    const doneTodo = Object.assign(newTodo, {completed: true});
    expect(component.onUpdate).toHaveBeenCalledWith({todos: [doneTodo]});
  });

  it('shoud delete todo', () => {
    component.addTodo(newTodo.text, 0);
    spyOn(component, 'onUpdate').and.callThrough();
    component.deleteTodo(0);
    expect(component.onUpdate).toHaveBeenCalledWith({todos: []});
  });

  it('shoud call completeAll', () => {
    component.addTodo(newTodo.text, 0);
    const doneTodo = Object.assign(newTodo, {completed: true});
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeAll();
    expect(component.onUpdate).toHaveBeenCalledWith({todos: [doneTodo]});
  });

  it('shoud call clearCompleted', () => {
    component.addTodo(newTodo.text, 0);
    component.completeTodo(0);
    spyOn(component, 'onUpdate').and.callThrough();
    component.clearCompleted();
    expect(component.onUpdate).toHaveBeenCalledWith({todos: []});
  });

  it('shoud call logoutUser', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.logoutUser();
    expect(component.onUpdate).toHaveBeenCalled();
  });

  describe('counters', () => {
    it('shoud call handleActiveCount', angular.mock.inject($componentController => {
      const bindings = { todos };
      const component = $componentController(MAIN, {}, bindings);
      const active = component.handleActiveCount();
      expect(active).toEqual(1);
    }));

    it('shoud call handleCompletedCount', angular.mock.inject($componentController => {
      const bindings = { todos };
      const component = $componentController(MAIN, {}, bindings);
      const completed = component.handleCompletedCount();
      expect(completed).toEqual(1);
    }));
});
});
