import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-mocks';
import Footer from './';
import TodosCount from '../todos-count';

describe('Footer component', () => {
  beforeEach(() => {
    angular
      .module('footerComponent', [uiRouter, 'app/components/footer/Footer.html'])
      .component('todosCount', TodosCount)
      .component('footerComponent', Footer);
    angular.mock.module('footerComponent');
  });

  interface IMyScope extends angular.IScope {
    activeCount: number;
  }

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: IMyScope = <IMyScope> $rootScope.$new();
    $scope.selectedFilter = 'show_active';
    const element = $compile('<footer-component filter="selectedFilter"></footer-component>')($scope);
    $scope.$digest();
    const count = element.find('span');
    expect(count.hasClass('todo-count')).toBeTruthy();
    const button = element.find('button');
    expect(button.length).toEqual(0);
  }));

  it('shoud call onClearCompleted', angular.mock.inject($componentController => {
    const bindings = {
      onClearCompleted: () => { return; }
    };
    const component = $componentController('footerComponent', {}, bindings);
    spyOn(component, 'onClearCompleted').and.callThrough();
    component.onClearCompleted();
    expect(component.onClearCompleted).toHaveBeenCalled();
  }));

  it('shoud call onCompleteAll', angular.mock.inject($componentController => {
    const bindings = {
      onCompleteAll: () => { return; }
    };
    const component = $componentController('footerComponent', {}, bindings);
    spyOn(component, 'onCompleteAll').and.callThrough();
    component.onCompleteAll();
    expect(component.onCompleteAll).toHaveBeenCalled();
  }));
});
