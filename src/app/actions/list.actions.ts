import * as types from '../constants/ActionTypes';

export function addList(name: string) {
  return {type: types.ADD_LIST, name};
}

export function deleteList(id: number) {
  return {type: types.DELETE_LIST, id};
}

export function editList(id: number, name: string) {
  return {type: types.EDIT_LIST, id, name};
}

const listActions = {
  deleteList,
  editList,
  addList
};

export default listActions;
