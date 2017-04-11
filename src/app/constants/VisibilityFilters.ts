import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from './TodoFilters';
import { ITodo } from "../interfaces";

function showAll(): boolean {
  return true;
}

function showCompleted(todo: ITodo): boolean {
  return todo.completed;
}

function showActive(todo: ITodo): boolean {
  return !todo.completed;
}

export default {
  [SHOW_ALL]: {filter: showAll, type: SHOW_ALL, name: 'All'},
  [SHOW_ACTIVE]: {filter: showActive, type: SHOW_ACTIVE, name: 'Active'},
  [SHOW_COMPLETED]: {filter: showCompleted, type: SHOW_COMPLETED, name: 'Completed'}
};

export function listIdFilter(listId: number): Function {
  return function listIdFilter(todo: ITodo): boolean {
    return todo.listId === listId;
  };
}
