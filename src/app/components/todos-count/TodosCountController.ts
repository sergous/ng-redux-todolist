import { Todo } from '../../todos/todos';

export default class TodosCountController {
  todos: Todo[];

  /** @ngInject */
  constructor() {
    this.completedCount = this.completedCount.bind(this);
    this.activeCount = this.activeCount.bind(this);
  }

  completeReducer(count: number, todo: Todo) {
    return todo.completed ? count + 1 : count;
  }

  completedCount() {
     return this.todos.reduce(this.completeReducer, 0);
  }

  activeCount() {
     return this.todos.length - this.todos.reduce(this.completeReducer, 0);
  }
}
