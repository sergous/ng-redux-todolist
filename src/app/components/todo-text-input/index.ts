import * as angular from 'angular';
import TodoTextInputController from './TodoTextInputController';
export default angular
  .module('app.components.TodoTextInput', [])
  .directive('todoTextInput', () => {
    return {
      template: require('./TodoTextInput.html'),
      controller: TodoTextInputController,
      controllerAs: 'input',
      bindToController: true,
      scope: {
        onSave: '&',
        placeholder: '@',
        newTodo: '@',
        editing: '@',
        text: '<'
      }
    };
  })
  .name;


