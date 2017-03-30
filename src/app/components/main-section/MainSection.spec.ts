import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import MainSection from './';
import rootReducer from '../../reducers/index';
import { Todo } from '../../todos/todos';
import { SHOW_COMPLETED } from '../../constants/TodoFilters';

const todos = [
  {id: 0, text: 'Active task', completed: false},
  {id: 1, text: 'Done task', completed: true}
];

describe('MainSection component', () => {
  let component;

  beforeEach(() => {
    angular
      .module('mainSection', [ngRedux, 'app/components/main-section/MainSection.html'])
      .component('mainSection', MainSection)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          rootReducer
        );
      });
    angular.mock.module('mainSection');
  });

  beforeEach(angular.mock.inject($componentController => {
    component = $componentController('mainSection', {}, {});
  }));

  it('shoud call clearCompleted', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.clearCompleted();
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud call completeAll', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeAll();
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud call activeCount', angular.mock.inject($componentController => {
    const bindings = { todos };
    const component = $componentController('mainSection', {}, bindings);
    const active = component.activeCount();
    expect(active).toEqual(1);
  }));

  it('shoud call completedCount', angular.mock.inject($componentController => {
    const bindings = { todos };
    const component = $componentController('mainSection', {}, bindings);
    const completed = component.completedCount();
    expect(completed).toEqual(1);
  }));

  it('shoud call completeTodo', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeTodo(0);
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud delete todo', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.deleteTodo(0);
    expect(component.onUpdate).toHaveBeenCalled();
  });
});
