import * as angular from 'angular';
import TodoListController from './TodoListController';

const TodoList: angular.IComponentOptions = {
  template: require('./TodoList.html'),
  controller: TodoListController,
  bindings: {
    todos: '=',
  }
};

export default TodoList;
