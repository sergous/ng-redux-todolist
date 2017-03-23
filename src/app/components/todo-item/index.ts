import * as angular from 'angular';
import TodoItemController from './TodoItemController';

const TodoItem: angular.IComponentOptions = {
  template: require('./TodoItem.html'),
  controller: TodoItemController,
  bindings: {
    todo: '<',
  }
};

export default TodoItem;
