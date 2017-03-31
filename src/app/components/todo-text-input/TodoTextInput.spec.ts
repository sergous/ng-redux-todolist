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

  describe('input', () => {
    let $scope: angular.IScope;
    let element: JQuery;
    let textInput: JQuery;
    const onSaveSpy = jasmine.createSpy('onSaveSpy');
    const bindings = {
      text: 'New todo',
      editing: true,
      onSave: onSaveSpy,
      placeholder: 'What needs to be done?'
    };

    beforeEach(angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      $scope = Object.assign($rootScope.$new(), bindings);
      element = $compile(`<todo-text-input
                            text="text"
                            placeholder="{{placeholder}}"
                            editing="editing"
                            on-save="onSave"
                          ></todo-text-input>`)($scope);
      $scope.$digest();
      textInput = element.find('input');
    }));

    it('should render correctly', () => {
      expect(textInput.attr('type')).toEqual('text');
      expect(textInput.attr('placeholder')).toEqual(bindings.placeholder);
      expect(textInput.hasClass('edit')).toBeTruthy();
      expect(textInput.hasClass('new-todo')).toBeFalsy();
      expect(textInput.val()).toBe(bindings.text);
    });
  });

  describe('component', () => {
    it('should bind the text to the element', angular.mock.inject($componentController => {
      const bindings = {
        text: 'Hello'
      };
      const component = $componentController('todoTextInput', {}, bindings);
      expect(component.text).toEqual('Hello');
    }));

    describe('onSave', () => {
      let onSaveSpy;
      beforeEach(() => {
        onSaveSpy = jasmine.createSpy('onSaveSpy');
      });

      it('should call onSave', angular.mock.inject($componentController => {
        const bindings = {
          onSave: onSaveSpy,
          text: 'Hello'
        };
        const component = $componentController('todoTextInput', {}, bindings);
        component.handleBlur();
        expect(component.onSave).toHaveBeenCalled();
      }));

      it('should not call onSave', angular.mock.inject($componentController => {
        const bindings = {
          onSave: onSaveSpy,
          text: ''
        };
        const component = $componentController('todoTextInput', {}, bindings);
        expect(component.text).toBe(bindings.text);
        component.handleBlur();
        expect(onSaveSpy).not.toHaveBeenCalled();
      }));

      it('should call onSave and clear text', angular.mock.inject($componentController => {
        const bindings = {
          onSave: onSaveSpy,
          newTodo: true,
          text: 'Hello'
        };
        const component = $componentController('todoTextInput', {}, bindings);
        component.handleSubmit({keyCode: 13});
        expect(component.onSave).toHaveBeenCalled();
        expect(component.text).toEqual('');
      }));
    });
  });
});
