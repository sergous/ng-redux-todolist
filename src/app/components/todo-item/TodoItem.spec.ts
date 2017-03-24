import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import TodoItem from './';
import rootReducer from '../../reducers/index';

describe('TodoItem component', () => {
  beforeEach(() => {
    angular
      .module('todoItem', [ngRedux, 'app/components/todo-item/TodoItem.html'])
      .component('todoItem', TodoItem)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          rootReducer
        );
      });
    angular.mock.module('todoItem');
  });

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope = $rootScope.$new();
    const element = $compile('<todo-item></todo-item>')($scope);
    $scope.$digest();
    const li = element.find('li');
    expect(li).not.toBeNull();
  }));

  it('should call set editing to true', angular.mock.inject($componentController => {
    const component = $componentController('todoItem', {}, {});
    spyOn(component, 'handleDoubleClick').and.callThrough();
    component.handleDoubleClick();
    expect(component.handleDoubleClick).toHaveBeenCalled();
    expect(component.editing).toEqual(true);
  }));

  it('should call onUpdate on call editTodo', angular.mock.inject($componentController => {
    const bindings = {
      todo: {
        text: 'Use ngrx/store',
        completed: false,
        id: 0
      }
    };
    const component = $componentController('todoItem', {}, bindings);
    spyOn(component, 'onUpdate').and.callThrough();
    component.editTodo(0, 'Hello');
    expect(component.onUpdate).toHaveBeenCalledWith({
      todos: [{text: 'Hello', id: 0, completed: false}]
    });
  }));
});
