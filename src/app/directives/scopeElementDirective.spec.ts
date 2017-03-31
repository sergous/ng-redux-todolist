import * as $ from 'jquery';
import * as angular from 'angular';
import 'angular-mocks';
import scopeElementDirective from './scopeElementDirective';

describe('scopeElement', () => {
  beforeEach(() => {
    angular
      .module('scopeElementDirective', [])
      .directive('scopeElement', scopeElementDirective);
    angular.mock.module('scopeElementDirective');
  });

  describe('directive', () => {
    let input: HTMLElement;
    beforeEach(() => {
      input = angular.element('<input scope-element="elementName" />')[0];
    });

    it('should add element to scope', angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      const $scope = $rootScope.$new();
      expect($scope.elementName).toBeUndefined();
      $compile(input)($scope);
      expect($scope.elementName).toBe(input);
    }));
  });
});
