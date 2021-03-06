import * as angular from 'angular';

const TodoItem: angular.IComponentOptions = {
  template: require('./TodoItem.html'),
  bindings: {
    todo: '<',
    isConfig: '<',
    isEditing: '=',
    onDelete: '&',
    onComplete: '&',
    onSave: '&'
  }
};

export default TodoItem;
