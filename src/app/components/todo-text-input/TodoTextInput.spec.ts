import * as angular from 'angular';
import 'angular-mocks';
import TodoTextInput from './';

describe('TodoTextInput', () => {
  beforeEach(() => {
    angular
      .module('todoTextInput', ['app/components/todo-text-input/TodoTextInput.html'])
      .component('todoTextInput', TodoTextInput);
    angular.mock.module('todoTextInput');
  });

  describe('element', () => {
    let $scope: angular.IScope;
    let element: JQuery;

    beforeEach(angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      $scope = $rootScope.$new();
      element = $compile('<todo-text-input></todo-text-input>')($scope);
    }));

    it('should render correctly', () => {
      $scope.$digest();
      const textInput = element.find('input');
      expect(textInput.attr('type')).toEqual('text');
    });

    describe('component', () => {
      it('should bind the text to the element', angular.mock.inject($componentController => {
        const bindings = {
          text: 'Hello'
        };
        const component = $componentController('todoTextInput', {}, bindings);
        expect(component.text).toEqual('Hello');
      }));

      it('should call onSave', angular.mock.inject($componentController => {
        const bindings = {
          onSave: () => {return; },
          text: 'Hello'
        };
        const component = $componentController('todoTextInput', {}, bindings);
        spyOn(component, 'onSave').and.callThrough();
        component.handleBlur();
        expect(component.onSave).toHaveBeenCalled();
      }));

      it('should not call onSave', angular.mock.inject($componentController => {
        const bindings = {
          onSave: () => {return; },
          text: ''
        };
        const component = $componentController('todoTextInput', {}, bindings);
        spyOn(component, 'onSave').and.callThrough();
        component.handleBlur();
        expect(component.onSave).not.toHaveBeenCalled();
      }));

      it('should call onSave and clear text', angular.mock.inject($componentController => {
        const bindings = {
          onSave: () => {return; },
          newTodo: true,
          text: 'Hello'
        };
        const component = $componentController('todoTextInput', {}, bindings);
        spyOn(component, 'onSave').and.callThrough();
        component.handleSubmit({keyCode: 13});
        expect(component.onSave).toHaveBeenCalled();
        expect(component.text).toEqual('');
      }));
    });
  });
});
