import * as types from '../constants/ActionTypes';
import AuthKeys from '../constants/AuthKeys';

export function changeEmail(email: string) {
  return {type: types.UPDATE_FIELD_AUTH, key: AuthKeys.email, value: email };
}

export function changePassword(password: string) {
  return {type: types.UPDATE_FIELD_AUTH, key: AuthKeys.password, value: password };
}

export function changeUsername(username: string) {
  return {type: types.UPDATE_FIELD_AUTH, key: AuthKeys.username, value: username };
}

export function registerUser(username: string, email: string, password: string) {
  const payload = {username, email, password};
  return {type: types.REGISTER, payload};
}

export function registerUnloaded() {
  return {type: types.REGISTER_PAGE_UNLOADED};
}

export function loginUser(email: string, password: string) {
  const payload = {email, password};
  return {type: types.LOGIN, payload};
}

export function loginUnloaded() {
  return {type: types.LOGIN_PAGE_UNLOADED};
}

const authActions = {
  changeEmail,
  changePassword,
  changeUsername,
  registerUser,
  registerUnloaded,
  loginUser,
  loginUnloaded
};

export default authActions;
