import * as angular from 'angular';
import TodoListContainerController from './TodoListContainerController';

export default angular
  .module('app.components.TodoListContainer', [])
  .directive('todoListContainer', () => {
    return {
      template: require('./TodoListContainer.html'),
      controller: TodoListContainerController,
      controllerAs: 'todoContainer',
      bindToController: true
    };
  })
  .name;

