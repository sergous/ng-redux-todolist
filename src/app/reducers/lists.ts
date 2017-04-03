import {
  ADD_LIST, DELETE_LIST, EDIT_LIST
} from '../constants/ActionTypes';
import {assign} from '../assign';

export interface IListItem {
  id: number;
  name: string;
}

export const initialList: IListItem[] = [
  {id: 0, name: 'Default'},
  {id: 1, name: 'Shopping List'},
];

export default function lists(state: any = initialList, action: any) {
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
