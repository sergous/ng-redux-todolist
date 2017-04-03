import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'angular-mocks';
import Footer from './';

interface IFooterScope extends angular.IScope {
  activeCount?: number;
  completedCount?: number;
  onCompleteAll: Function;
  onClearCompleted: Function;
}

describe('Footer component', () => {
  beforeEach(() => {
    angular
      .module('footerComponent', [uiRouter, 'app/components/footer/Footer.html'])
      .component('footerComponent', Footer);
    angular.mock.module('footerComponent');
  });

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const bindings = {
      activeCount: 1
    };
    const $scope: IFooterScope = <IFooterScope> Object.assign($rootScope.$new(), bindings);
    const element = $compile('<footer-component active-count="activeCount"></footer-component>')($scope);
    $scope.$digest();
    const button = element.find('md-button');
    expect(button.length).toEqual(1);
  }));

  describe('button Complete All', () => {
    it('should call onCompleteAll', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      const onCompleteAllSpy = jasmine.createSpy('onCompleteAllSpy');
      const bindings = {
        activeCount: 1,
        onCompleteAll: onCompleteAllSpy,
      };
      const $scope: IFooterScope = <IFooterScope> Object.assign($rootScope.$new(), bindings);
      const element = $compile('<footer-component active-count="activeCount" on-complete-all="onCompleteAll()"></footer-component>')($scope);
      $scope.$digest();
      const completeAllButton: HTMLElement = element.find('md-button')[0];
      expect(completeAllButton.textContent).toContain('Complete All');
      completeAllButton.click();
      expect(onCompleteAllSpy).toHaveBeenCalled();
    }));
  });

  describe('button Clear completed', () => {
    it('should call onClearCompleted', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      const onClearCompletedSpy = jasmine.createSpy('onClearCompletedSpy');
      const bindings = {
        completedCount: 1,
        onClearCompleted: onClearCompletedSpy,
      };
      const $scope: IFooterScope = <IFooterScope> Object.assign($rootScope.$new(), bindings);
      const element = $compile('<footer-component completed-count="completedCount" on-clear-completed="onClearCompleted()"></footer-component>')($scope);
      $scope.$digest();
      const clearCompletedButton = element.find('md-button')[0];
      expect(clearCompletedButton.textContent).toContain('Clear completed');
      clearCompletedButton.click();
      expect(onClearCompletedSpy).toHaveBeenCalled();
    }));
  });
});
