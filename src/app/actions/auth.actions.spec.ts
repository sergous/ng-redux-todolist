import * as types from '../constants/ActionTypes';
import * as actions from './auth.actions';
import agent from '../agents/localStorage.agent';
import AuthKeys from '../constants/AuthKeys';

describe('auth actions', () => {
  const email = 'john@doe.com';
  const password = 'secret';
  const username = 'johndoe';
  const payload = new Promise(resolve => resolve({}));

  it('changeEmail should create UPDTA_FIELD_AUTH action', () => {
    expect(actions.changeEmail(email)).toEqual({
      type: types.UPDATE_FIELD_AUTH,
      key: AuthKeys.email,
      value: email
    });
  });

  it('changeUsername should create UPDTA_FIELD_AUTH action', () => {
    expect(actions.changeUsername(username)).toEqual({
      type: types.UPDATE_FIELD_AUTH,
      key: AuthKeys.username,
      value: username
    });
  });

  it('changePassword should create UPDTA_FIELD_AUTH action', () => {
    expect(actions.changePassword(password)).toEqual({
      type: types.UPDATE_FIELD_AUTH,
      key: AuthKeys.password,
      value: password
    });
  });

  it('registerUser should create REGISTER action', () => {
    expect(actions.registerUser(username, email, password)).toEqual({
      type: types.REGISTER,
      payload
    });
  });

  it('loginUser should create LOGIN action', () => {
    expect(actions.loginUser(email, password)).toEqual({
      type: types.LOGIN,
      payload
    });
  });

  it('logoutUser should create LOGOUT action', () => {
    expect(actions.logoutUser()).toEqual({
      type: types.LOGOUT
    });
  });
});
