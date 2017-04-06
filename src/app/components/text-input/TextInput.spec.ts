import * as angular from 'angular';
import 'angular-mocks';
import TextInput from './';

describe('TextInput component', () => {
  let $scope: angular.IScope;
  let element: JQuery;
  let textInput: JQuery;
  const onSaveSpy = jasmine.createSpy('onSaveSpy');
  const bindings = {
    text: 'New todo',
    isEditing: true,
    placeholder: 'What needs to be done?'
  };

  beforeEach(() => {
    angular
      .module('TextInput', ['app/components/text-input/TextInput.html'])
      .component('textInput', TextInput);
    angular.mock.module('TextInput');
  });

  beforeEach(angular.mock.inject((
    $rootScope: angular.IRootScopeService,
    $compile: angular.ICompileService
  ) => {
    $scope = Object.assign($rootScope.$new(), bindings);
    element = $compile(`<text-input
                          text="text"
                          placeholder="{{placeholder}}"
                          is-editing="isEditing"
                          on-save="onSave"
                        ></text-input>`)($scope);
    $scope.$digest();
    textInput = element.find('input');
  }));

  it('should render correctly editing', () => {
    expect(textInput.attr('type')).toEqual('text');
    expect(textInput.attr('placeholder')).toEqual(bindings.placeholder);
    expect(textInput.hasClass('edit')).toBeTruthy();
    expect(textInput.hasClass('new')).toBeFalsy();
    expect(textInput.val()).toBe(bindings.text);
  });
});
