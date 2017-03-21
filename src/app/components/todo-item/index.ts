import * as angular from 'angular';
import TodoItemController from './TodoItemController';
export default angular
  .module('app.components.TodoItem', [])
  .directive('todoItem', () => {
    return {
      template: require('./TodoItem.html'),
      controller: TodoItemController,
      controllerAs: 'todo',
      bindToController: true,
      scope: {
        todo: '<',
      }
    };
  })
  .name;
