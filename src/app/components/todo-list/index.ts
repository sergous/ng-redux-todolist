import * as angular from 'angular';
import TodoListController from './TodoListController';

export default angular
  .module('app.components.TodoList', [])
  .directive('todoList', () => {
    return {
      template: require('./TodoList.html'),
      controller: TodoListController,
      controllerAs: 'todolist',
      bindToController: true
    };
  })
  .name;

