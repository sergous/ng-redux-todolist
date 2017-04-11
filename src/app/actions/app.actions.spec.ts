import * as types from '../constants/ActionTypes';
import * as actions from './app.actions';

describe('app actions', () => {
  const token = 'TOKENEXAMPLE';
  const state = 'somestate';
  const payload = new Promise((resolve => resolve({})));

  it('appLoad should create APP_LOAD action', () => {
    expect(actions.appLoad(payload, token)).toEqual({
      type: types.APP_LOAD,
      payload,
      token,
      skipTracking: true
    });
  });

  it('validateToken should create VALIDATE_TOKEN action', () => {
    expect(actions.validateToken(token)).toEqual({
      type: types.VALIDATE_TOKEN,
      payload,
      token
    });
  });

  it('redirect should create REDIRECT action', () => {
    expect(actions.redirect(state)).toEqual({
      type: types.REDIRECT,
      state
    });
  });

  it('homeUnloaded should create HOME_PAGE_UNLOADED action', () => {
    expect(actions.homeUnloaded()).toEqual({
      type: types.HOME_PAGE_UNLOADED
    });
  });

  it('loginUnloaded should create LOGIN_PAGE_UNLOADED action', () => {
    expect(actions.loginUnloaded()).toEqual({
      type: types.LOGIN_PAGE_UNLOADED
    });
  });

  it('registerUnloaded should create REGISTER_PAGE_UNLOADED action', () => {
    expect(actions.registerUnloaded()).toEqual({
      type: types.REGISTER_PAGE_UNLOADED
    });
  });
});

