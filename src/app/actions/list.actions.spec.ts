import * as types from '../constants/ActionTypes';
import * as actions from './list.actions';

describe('list actions', () => {
  it('addList should create ADD_LIST action', () => {
    expect(actions.addList('Todo List')).toEqual({
      type: types.ADD_LIST,
      name: 'Todo List'
    });
  });

  it('deleteList should create DELETE_LIST action', () => {
    expect(actions.deleteList(1)).toEqual({
      type: types.DELETE_LIST,
      id: 1
    });
  });

  it('editList should create EDIT_LIST action', () => {
    expect(actions.editList(1, 'New list name')).toEqual({
      type: types.EDIT_LIST,
      id: 1,
      name: 'New list name'
    });
  });
});
