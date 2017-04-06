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

  describe('controller', () => {
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

    describe('onBlur', () => {
      let onBlurSpy;
      beforeEach(() => {
        onBlurSpy = jasmine.createSpy('onBlurSpy');
      });

      it('should call onBlur', angular.mock.inject($componentController => {
        const bindings = {
          onBlur: onBlurSpy,
          newTodo: true,
          text: 'Hello'
        };
        const component = $componentController('todoTextInput', {}, bindings);
        component.handleBlur();
        expect(component.onBlur).toHaveBeenCalled();
      }));
    });
  });
});
