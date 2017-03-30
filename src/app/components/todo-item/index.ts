import * as angular from 'angular';

const TodoItem: angular.IComponentOptions = {
  template: require('./TodoItem.html'),
  bindings: {
    todo: '<',
    editing: '=',
    onDelete: '&',
    onComplete: '&',
    onSave: '&'
  }
};

export default TodoItem;
