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

export const initAuth = {
  inProgress: false
};

export {AuthKeys};
export const ASYNC_DELAY = 500;
export const TOKEN_TTL_SEC = 60;
export const SESSION_TTL_SEC = 5000;
export const MOCK_USER_KEY = 'SERVER_USER';
export const SESSION_TOKEN = 'TOKENEXAMPLE';
export const SESSION_TOKEN_KEY = 'SESSION';
export const TOKEN_TTL_KEY = 'TOKEN_EXPIRE_TIME';
export const SESSION_TTL_KEY = 'SESSION_EXPIRE_TIME';

export default {
  initUser,
  initTodos,
  AuthKeys,
  ActionTypes,
  RouterStates,
  TodoFilters,
  VisibilityFilters
};
