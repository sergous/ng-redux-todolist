import * as angular from 'angular';
import 'angular-mocks';
import TextInput from './';

describe('TextInput', () => {
  beforeEach(() => {
    angular
      .module('TextInput', ['app/components/text-input/TextInput.html'])
      .component('textInput', TextInput);
    angular.mock.module('TextInput');
  });

  describe('controller', () => {
    let onChancelSpy;
    let onSaveSpy;
    beforeEach(() => {
      onChancelSpy = jasmine.createSpy('onChancelSpy');
      onSaveSpy = jasmine.createSpy('onSaveSpy');
    });

    it('should bind the text to the element', angular.mock.inject($componentController => {
      const bindings = {
        text: 'Hello'
      };
      const component = $componentController('textInput', {}, bindings);
      expect(component.text).toEqual('Hello');
    }));

    describe('handleSubmit', () => {
      it('should call onSave and clear text', angular.mock.inject($componentController => {
        const bindings = {
          onSave: onSaveSpy,
          isNew: true,
          text: 'Hello'
        };
        const component = $componentController('textInput', {}, bindings);
        component.handleSubmit({keyCode: 13});
        expect(component.onSave).toHaveBeenCalled();
        expect(component.text).toEqual('');
      }));
    });

    describe('handleSave', () => {
      it('should call onSave and clear text', angular.mock.inject($componentController => {
        const bindings = {
          isNew: true,
          onSave: onSaveSpy,
          text: 'Hello'
        };
        const component = $componentController('textInput', {}, bindings);
        component.handleSave();
        expect(component.onSave).toHaveBeenCalled();
        expect(component.text).toEqual('');
      }));

      it('should call onSave', angular.mock.inject($componentController => {
        const bindings = {
          onSave: onSaveSpy,
          text: 'Hello'
        };
        const component = $componentController('textInput', {}, bindings);
        component.handleSave();
        expect(component.onSave).toHaveBeenCalled();
      }));

      it('should not call onSave', angular.mock.inject($componentController => {
        const bindings = {
          onSave: onSaveSpy,
          text: ''
        };
        const component = $componentController('textInput', {}, bindings);
        expect(component.text).toBe(bindings.text);
        component.handleSave();
        expect(onSaveSpy).not.toHaveBeenCalled();
      }));
    });

    describe('handleEsc', () => {
      it('should call onChancel', angular.mock.inject($componentController => {
        const bindings = {
          onChancel: onChancelSpy,
        };
        const component = $componentController('textInput', {}, bindings);
        component.handleEsc({keyCode: 27});
        expect(component.onChancel).toHaveBeenCalled();
      }));
    });

    describe('handleChancel', () => {
      it('should call onChancel', angular.mock.inject($componentController => {
        const bindings = {
          onChancel: onChancelSpy,
          isNew: true,
          text: ''
        };
        const component = $componentController('textInput', {}, bindings);
        component.handleChancel();
        expect(component.onChancel).toHaveBeenCalled();
        expect(component.text).toEqual('');
      }));
    });
  });
});
