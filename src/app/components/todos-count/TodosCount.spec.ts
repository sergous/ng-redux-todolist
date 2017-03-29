import * as angular from 'angular';
import 'angular-mocks';
import TodosCount from './';

describe('TodosCount component', () => {
  beforeEach(() => {
    angular
      .module('todosCount', ['app/components/todos-count/TodosCount.html'])
      .component('todosCount', TodosCount);
    angular.mock.module('todosCount');
  });

  interface IMyScope extends angular.IScope {
    activeCount: number;
  }

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: IMyScope = <IMyScope> $rootScope.$new();
    const element = $compile('<todos-count active-count="1"></todos-count>')($scope);
    $scope.$digest();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('1');
  }));
});
