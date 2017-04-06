import * as angular from 'angular';
import TodoTextInputController from './TodoTextInputController';

const TodoTextInput: angular.IComponentOptions = {
  template: require('./TodoTextInput.html'),
  controller: TodoTextInputController,
  bindings: {
    onSave: '&',
    onBlur: '&',
    placeholder: '@',
    newTodo: '<',
    editing: '<',
    text: '<'
  }
};

export default TodoTextInput;

