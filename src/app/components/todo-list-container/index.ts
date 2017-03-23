import * as angular from 'angular';
import TodoListContainerController from './TodoListContainerController';

const TodoListContainer: angular.IComponentOptions = {
  template: require('./TodoListContainer.html'),
  controller: TodoListContainerController,
};

export default TodoListContainer;
