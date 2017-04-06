import * as angular from 'angular';
import TextInputController from './TextInputController';

const TextInput: angular.IComponentOptions = {
  template: require('./TextInput.html'),
  controller: TextInputController,
  bindings: {
    onSave: '&',
    onChancel: '&',
    placeholder: '@',
    isNew: '<',
    isEditing: '=',
    text: '<'
  }
};

export default TextInput;

