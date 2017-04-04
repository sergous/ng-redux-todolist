import * as types from '../constants/ActionTypes';

export function addTodo(text: string, listId: number) {
  return {type: types.ADD_TODO, text, listId};
}

export function deleteTodo(id: number) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id: number, text: string) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id: number) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function deleteAll() {
  return {type: types.DELETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

const todoActions = {
  clearCompleted,
  completeAll,
  deleteAll,
  deleteTodo,
  editTodo,
  addTodo,
  completeTodo
};

export default todoActions;
