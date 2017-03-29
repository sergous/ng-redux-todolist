import * as angular from 'angular';
import TodosCountController from './TodosCountController';

const TodosCount: angular.IComponentOptions = {
  template: require('./TodosCount.html'),
  controller: TodosCountController,
  bindings: {
    todos: '<'
  }
};
export default TodosCount;
