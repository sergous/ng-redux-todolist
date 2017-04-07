import * as types from '../constants/ActionTypes';
import agent from '../agents/localStorage.agent';
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
  const payload = agent.Auth.register(username, email, password);
  return {type: types.REGISTER, payload};
}

export function loginUser(email: string, password: string) {
  const payload = agent.Auth.login(email, password);
  return {type: types.LOGIN, payload};
}

export function logoutUser() {
  return {type: types.LOGOUT};
}

const authActions = {
  changeEmail,
  changePassword,
  changeUsername,
  registerUser,
  loginUser,
  logoutUser
};

export default authActions;
