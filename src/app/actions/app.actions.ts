import * as types from '../constants/ActionTypes';
import agent from '../agents/localStorage.agent';

export function homeUnloaded() {
  return {type: types.HOME_PAGE_UNLOADED};
}

export function loginUnloaded() {
  return {type: types.LOGIN_PAGE_UNLOADED};
}

export function registerUnloaded() {
  return {type: types.REGISTER_PAGE_UNLOADED};
}

export function redirect(state: string) {
  return {type: types.REDIRECT, state};
}

export function appLoad(payload: any, token: string) {
  return {type: types.APP_LOAD, payload, token, skipTracking: true};
}

export function validateToken(token: string) {
  const payload = agent.Auth.validate(token);
  return {type: types.VALIDATE_TOKEN, token, payload};
}

const appActions = {
  registerUnloaded,
  loginUnloaded,
  homeUnloaded,
  redirect,
  appLoad,
  validateToken,
};

export default appActions;
