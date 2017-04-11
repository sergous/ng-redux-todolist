import * as angular from 'angular';
import 'angular-mocks';
import TodosCount from './';
import { ITodosCountScope } from "../../interfaces";

describe('TodosCount component', () => {
  beforeEach(() => {
    angular
      .module('todosCount', ['app/components/todos-count/TodosCount.html'])
      .component('todosCount', TodosCount);
    angular.mock.module('todosCount');
  });


  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: ITodosCountScope = <ITodosCountScope> $rootScope.$new();
    const element = $compile('<todos-count active-count="1"></todos-count>')($scope);
    $scope.$digest();
    const count = element.find('span');
    expect(count.hasClass('todo-count')).toBeTruthy();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('1');
    expect(element.html().trim()).toContain('item');
    expect(element.html().trim()).not.toContain('items');
  }));

  it('should render multiple count', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: ITodosCountScope = <ITodosCountScope> $rootScope.$new();
    const element = $compile('<todos-count active-count="2"></todos-count>')($scope);
    $scope.$digest();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('2');
    expect(element.html().trim()).toContain('items');
  }));

  it('should render blank count', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: ITodosCountScope = <ITodosCountScope> $rootScope.$new();
    const element = $compile('<todos-count></todos-count>')($scope);
    $scope.$digest();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('No');
  }));
});
