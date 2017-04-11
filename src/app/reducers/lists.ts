import {
  ADD_LIST, DELETE_LIST, EDIT_LIST
} from '../constants/ActionTypes';
import { assign } from '../assign';
import { IListItem } from "../interfaces";
import { initList } from "../constants";

export default function lists(state: any = initList, action: any) {
  switch (action.type) {
    case ADD_LIST:
      return [
        {
          id: state.reduce((maxId, list) => Math.max(list.id, maxId), -1) + 1,
          name: action.name
        },
        ...state
      ];

    case DELETE_LIST:
      return state.filter(list =>
        list.id !== action.id
      );

    case EDIT_LIST:
      return state.map(list =>
        list.id === action.id ?
          assign({}, list, {name: action.name}) :
          list
      );

    default:
      return state;
  }
}
