import * as angular from 'angular';
import 'angular-mocks';
import TodoItem from './';

const todo = {
        text: 'Hello',
        completed: false,
        id: 0
      };

describe('TodoItem component', () => {
  beforeEach(() => {
    angular
      .module('todoItem', ['app/components/todo-item/TodoItem.html'])
      .component('todoItem', TodoItem);
    angular.mock.module('todoItem');
  });

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope = $rootScope.$new();
    const element = $compile('<todo-item></todo-item>')($scope);
    $scope.$digest();
    const li = element.find('li');
    expect(li).not.toBeNull();
  }));
});
