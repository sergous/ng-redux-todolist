import * as angular from 'angular';
import 'angular-mocks';
import Footer from './';

describe('Footer component', () => {
  beforeEach(() => {
    angular
      .module('footerComponent', ['app/components/footer/Footer.html'])
      .component('footerComponent', Footer);
    angular.mock.module('footerComponent');
  });

  interface IMyScope extends angular.IScope {
    activeCount: number;
  }

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: IMyScope = <IMyScope> $rootScope.$new();
    $scope.activeCount = 2;
    const element = $compile('<footer-component active-count="activeCount"></footer-component>')($scope);
    $scope.$digest();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('2');
  }));

  it('shoud call onClearCompleted', angular.mock.inject($componentController => {
    const bindings = {
      onClearCompleted: () => {
        return;
      }
    };
    const component = $componentController('footerComponent', {}, bindings);
    spyOn(component, 'onClearCompleted').and.callThrough();
    component.onClearCompleted();
    expect(component.onClearCompleted).toHaveBeenCalled();
  }));

  it('should call onSetFilter', angular.mock.inject(($componentController) => {
    const bindings = {
      onSetFilter: () => {
        return;
      }
    };
    const component = $componentController('footerComponent', {}, bindings);
    spyOn(component, 'onSetFilter').and.callThrough();
    component.onSetFilter({filter: 'show_all'});
    expect(component.onSetFilter).toHaveBeenCalledWith({filter: 'show_all'});
  }));
});
