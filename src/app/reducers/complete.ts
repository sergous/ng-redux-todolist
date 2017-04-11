import { ITodo } from "../interfaces/index";

export default function completeReducer(count: number, todo: ITodo) {
  return todo.completed ? count + 1 : count;
}
