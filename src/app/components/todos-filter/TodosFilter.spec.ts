import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-mocks';
import TodosFilter from './';
import TodosFilterController from './TodosFilterController';

describe('Filter component', () => {
  beforeEach(() => {
    angular
      .module('todosFilter', [uiRouter, 'app/components/todos-filter/TodosFilter.html'])
      .controller('TodosFilterController', TodosFilterController)
      .component('todosFilter', TodosFilter);
    angular.mock.module('todosFilter');
  });

  interface IMyScope extends angular.IScope {
    activeCount: number;
  }

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: IMyScope = <IMyScope> $rootScope.$new();
    $scope.selectedFilter = 'show_active';
    const element = $compile('<todos-filter filter="selectedFilter"></todos-filter>')($scope);
    $scope.$digest();
    const tabs = element.find('md-tabs');
    expect(tabs.length).toEqual(1);
    const button = element.find('button');
    expect(button.length).toEqual(0);
  }));

  it('should call onSetFilter', angular.mock.inject(($componentController) => {
    const bindings = {
      onSetFilter: () => {
        return;
      }
    };
    const component = $componentController('todosFilter', {}, bindings);
    spyOn(component, 'onSetFilter').and.callThrough();
    component.onSetFilter({filter: 'show_all'});
    expect(component.onSetFilter).toHaveBeenCalledWith({filter: 'show_all'});
  }));
});
