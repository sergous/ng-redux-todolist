import * as angular from 'angular';
import 'angular-mocks';
import TodosCount from './';
import { Todo } from '../../todos/todos';
import TodosCountController from './TodosCountController';

const todos = [
  {id: 0, text: 'Active task', completed: false},
  {id: 1, text: 'Done task', completed: true}
];

describe('TodosCount component', () => {
  beforeEach(() => {
    angular
      .module('todosCount', ['app/components/todos-count/TodosCount.html'])
      .controller('TodosCountController', TodosCountController)
      .component('todosCount', TodosCount);
    angular.mock.module('todosCount');
  });

  interface IMyScope extends angular.IScope {
    activeCount: number;
  }

  it('should render correctly', angular.mock.inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
    const $scope: IMyScope = <IMyScope> $rootScope.$new();
    $scope.todos = todos;
    const element = $compile('<todos-count todos="todos"></todos-count>')($scope);
    $scope.$digest();
    const footer = element.find('strong');
    expect(footer.html().trim()).toEqual('1');
  }));

  it('shoud bind todos', angular.mock.inject($componentController => {
    const bindings = { todos };
    const component = $componentController('todosCount', {}, bindings);
    const total = component.todos;
    expect(total.length).toEqual(2);
  }));

  it('shoud call completeReducer', angular.mock.inject($componentController => {
    const bindings = { todos };
    const component = $componentController('todosCount', {}, bindings);
    const complete = component.completeReducer(0, todos[1]);
    expect(complete).toEqual(1);
  }));

  it('shoud call activeCount', angular.mock.inject($componentController => {
    const bindings = { todos };
    const component = $componentController('todosCount', {}, bindings);
    const active = component.activeCount();
    expect(active).toEqual(1);
  }));

  it('shoud call completedCount', angular.mock.inject($componentController => {
    const bindings = { todos };
    const component = $componentController('todosCount', {}, bindings);
    const completed = component.completedCount();
    expect(completed).toEqual(1);
  }));
});
