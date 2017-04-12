import * as types from '../constants/ActionTypes';
import * as states from '../constants/RouterStates';
import app from './app';
import { initApp, initUser } from "../constants";

describe('app reducer', () => {
  const user = initUser;

  it('should handle initial state', () => {
    expect(
      app(undefined, {})
    ).toEqual(initApp);
  });

  it('should handle APP_LOAD', () => {
    expect(
      app({}, {
        type: types.APP_LOAD,
        payload: {user},
        token: user.token,
        skipTracking: false
      })
    ).toEqual({
      appLoaded: true,
      payload: {user},
      token: user.token,
      skipTracking: false
    });
  });

  it('should handle REDIRECT', () => {
    expect(
      app({}, {
        type: types.REDIRECT
      })
    ).toEqual({
      redirectToState: null
    });
  });

  it('should handle LOGOUT', () => {
    expect(
      app({}, {
        type: types.LOGOUT
      })
    ).toEqual({
      redirectToState: states.APP_LOGIN
    });
  });

  it('should handle LOGIN', () => {
    expect(
      app({}, {
        type: types.LOGIN,
        payload: {user}
      })
    ).toEqual({
      token: user.token,
      redirectToState: states.APP_MAIN,
      currentUser: user
    });

    expect(
      app({}, {
        type: types.LOGIN,
        error: true
      })
    ).toEqual({
      token: null,
      redirectToState: null,
      currentUser: null
    });
  });

  it('should handle REGISTER', () => {
    expect(
      app({}, {
        type: types.REGISTER,
        payload: {user}
      })
    ).toEqual({
      token: user.token,
      redirectToState: states.APP_MAIN,
      currentUser: user
    });

    expect(
      app({}, {
        type: types.REGISTER,
        error: true
      })
    ).toEqual({
      token: null,
      redirectToState: null,
      currentUser: null
    });
  });

  it('should handle VALIDATE_TOKEN', () => {
    expect(
      app({}, {
        type: types.VALIDATE_TOKEN,
        payload: {user}
      })
    ).toEqual({
      token: user.token,
      redirectToState: states.APP_MAIN,
      currentUser: user
    });

    expect(
      app({}, {
        type: types.VALIDATE_TOKEN,
        error: true
      })
    ).toEqual({
      token: null,
      redirectToState: null,
      currentUser: null
    });
  });

  it('should handle HOME_PAGE_UNLOADED', () => {
    expect(
      app({viewChangeCounter: 0}, {
        type: types.HOME_PAGE_UNLOADED
      })
    ).toEqual({
      viewChangeCounter: 1,
      redirectToState: states.APP_MAIN
    });
  });

  it('should handle REGISTER_PAGE_UNLOADED', () => {
    expect(
      app({viewChangeCounter: 0}, {
        type: types.REGISTER_PAGE_UNLOADED
      })
    ).toEqual({
      viewChangeCounter: 1,
      redirectToState: states.APP_LOGIN
    });
  });

  it('should handle LOGIN_PAGE_UNLOADED', () => {
    expect(
      app({viewChangeCounter: 0}, {
        type: types.LOGIN_PAGE_UNLOADED
      })
    ).toEqual({
      viewChangeCounter: 1,
      redirectToState: states.APP_LOGIN
    });
  });
});
