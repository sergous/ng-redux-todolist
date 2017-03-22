import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import TodoListController from './TodoListController';

export default angular
  .module('app.components.TodoList', [uiRouter])
  .controller('TodoListController', TodoListController)
  .directive('todoList', () => {
    return {
      template: require('./TodoList.html'),
      controller: TodoListController,
      controllerAs: 'todoList',
      bindToController: true,
      restrict: 'E',
      scope: {
        todos: '=',
      }
    };
  })
  .name;
