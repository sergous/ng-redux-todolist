import * as angular from 'angular';

const TodosCount: angular.IComponentOptions = {
  template: require('./TodosCount.html'),
  bindings: {
    activeCount: '<'
  }
};
export default TodosCount;
