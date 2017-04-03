import * as angular from 'angular';
import 'angular-mocks';
import TodoTextInput from './';

describe('TodoTextInput component', () => {
  let $scope: angular.IScope;
  let element: JQuery;
  let textInput: JQuery;
  const onSaveSpy = jasmine.createSpy('onSaveSpy');
  const bindings = {
    text: 'New todo',
    editing: true,
    placeholder: 'What needs to be done?'
  };

  beforeEach(() => {
    angular
      .module('todoTextInput', ['app/components/todo-text-input/TodoTextInput.html'])
      .component('todoTextInput', TodoTextInput);
    angular.mock.module('todoTextInput');
  });

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

  it('should render correctly editing', () => {
    expect(textInput.attr('type')).toEqual('text');
    expect(textInput.attr('placeholder')).toEqual(bindings.placeholder);
    expect(textInput.hasClass('edit')).toBeTruthy();
    expect(textInput.hasClass('new-todo')).toBeFalsy();
    expect(textInput.val()).toBe(bindings.text);
  });
});
