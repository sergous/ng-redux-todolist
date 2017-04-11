import AuthKeys from './AuthKeys';
import VisibilityFilters from './VisibilityFilters';
import * as ActionTypes from './ActionTypes';
import * as RouterStates from './RouterStates';
import * as TodoFilters from './TodoFilters';
export { ERRORS } from "./errors";
import { IUser, IListItem, ITodo } from "../interfaces";

export const initUser: IUser = {
  username: 'user',
  email: 'user@host.com',
  password: 'password',
  token: 'TOKENEXAMPLE'
};

export const initTodos: ITodo[] = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
    listId: 0
  },
  {
    text: 'Get milk',
    completed: false,
    id: 1,
    listId: 1
  }
];

export const initList: IListItem[] = [
  {id: 0, name: 'Default'},
  {id: 1, name: 'Shopping List'},
];

export const initApp = {
  appName: 'TodoList',
  viewChangeCounter: 0
};

export const ASYNC_DELAY = 500;
export const MOCK_USER_KEY = 'USERKEY';
export const SESSION_TOKEN = 'TOKENEXAMPLE';

export default {
  initUser,
  initTodos,
  AuthKeys,
  ActionTypes,
  RouterStates,
  TodoFilters,
  VisibilityFilters
};
