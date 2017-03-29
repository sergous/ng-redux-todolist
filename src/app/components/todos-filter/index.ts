import * as angular from 'angular';
import TodosFilterController from './TodosFilterController';

const TodosFilter: angular.IComponentOptions = {
  template: require('./TodosFilter.html'),
  controller: TodosFilterController,
  bindings: {
    selectedFilter: '<filter'
  }
};
export default TodosFilter;
