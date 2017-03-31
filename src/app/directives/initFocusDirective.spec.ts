import * as $ from 'jquery';
import * as angular from 'angular';
import 'angular-mocks';
import initFocusDirective from './initFocusDirective';

describe('initFocus', () => {
  beforeEach(() => {
    angular
      .module('initFocusDirective', [])
      .directive('initFocus', initFocusDirective);
    angular.mock.module('initFocusDirective');
  });

  describe('directive', () => {
    const focusSpy = jasmine.createSpy('focusSpy');
    let input: HTMLElement;
    beforeEach(() => {
      document.body.addEventListener('focus', focusSpy);
      input = angular.element('<input init-focus="" />')[0];
      document.body.appendChild(input);
    });

    it('should call element focus', angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      input.focus = focusSpy;
      $compile(input)($rootScope);
      expect(focusSpy).toHaveBeenCalled();
    }));

    it('should set document active element', angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      expect(document.activeElement.tagName).toBe('BODY');
      $compile(input)($rootScope);
      expect(document.activeElement.tagName).toBe(input.tagName);
    }));
  });
});
