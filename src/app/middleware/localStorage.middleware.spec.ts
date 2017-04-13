import agent from '../agents/localStorage.agent';
import * as types from '../constants/ActionTypes';
import { SESSION_TOKEN_KEY, SESSION_TTL_SEC, initUser } from "../constants";
import { setLocalStoreTTL, localStorageMiddleware } from './localStorage.middleware';

describe('localStorageMiddleware', () => {
  let setLocalStoreTTL: jasmine.Spy;
  let next: jasmine.Spy;
  let store: any = {};
  beforeEach(() => {
    spyOn(localStorage, 'setItem').and.callFake(args => null);
    next = jasmine.createSpy('nextSpy');
    spyOn(agent, 'setToken');
  });

  it('should handle REGISTER, LOGIN, VALIDATE_TOKEN', () => {
    const action = {
      type: types.REGISTER,
      payload: {user: initUser}
    };
    localStorageMiddleware(store)(next)(action);
    expect(localStorage.setItem).toHaveBeenCalledWith(SESSION_TOKEN_KEY, action.payload.user.token);
    expect(agent.setToken).toHaveBeenCalledWith(action.payload.user.token);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should handle REGISTER, LOGIN, VALIDATE_TOKEN with error', () => {
    const action = {
      type: types.REGISTER,
      error: true
    };
    localStorageMiddleware(store)(next)(action);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(agent.setToken).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should handle REGISTER, LOGIN, VALIDATE_TOKEN with no user', () => {
    const action = {
      type: types.LOGIN,
      payload: {}
    };
    localStorageMiddleware(store)(next)(action);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(agent.setToken).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should handle LOGOUT', () => {
    const action = {
      type: types.LOGOUT
    };
    localStorageMiddleware(store)(next)(action);
    expect(localStorage.setItem).toHaveBeenCalledWith(SESSION_TOKEN_KEY, '');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(agent.setToken).toHaveBeenCalledWith(null);
    expect(next).toHaveBeenCalledWith(action);
  });
});

describe('setLocalStoreTTL', () => {
  const ttl_sec = 2;
  const now = Date.now();
  const value = '' + now + ttl_sec * 1000;
  it('should set localStorage item value', () => {
    spyOn(localStorage, 'setItem').and.callFake(args => '' + args[1] * 1000);
    spyOn(Date, 'now').and.callFake(() => now);
    setLocalStoreTTL('key', ttl_sec);
    expect(localStorage.setItem).toHaveBeenCalledWith('key', value);
  });
});
