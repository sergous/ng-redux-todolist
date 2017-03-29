import { Todo } from '../todos/todos';

export default function completeReducer(count: number, todo: Todo) {
  return todo.completed ? count + 1 : count;
}
