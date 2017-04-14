import * as types from '../constants/ActionTypes';
import * as states from '../constants/RouterStates';
import appActions from '../actions/app.actions';
import { stateGo,
         stateReload,
         stateTransitionTo
} from "redux-ui-router";
import { SESSION_TOKEN_KEY, SESSION_TTL_KEY, TOKEN_TTL_KEY, TOKEN_TTL_SEC } from "../constants";
import { routerMiddleware } from './router.middleware';

describe('routerMiddleware', () => {
  let next: jasmine.Spy;
  let getStateSpy: jasmine.Spy;
  let dispatchSpy: jasmine.Spy;
  let state: any;
  let store: any;
  let action: any;

  beforeEach(() => {
    next = jasmine.createSpy('nextSpy');

    action = {
      type: types.REGISTER
    };

    state = {
      app: {redirectToState: states.APP_MAIN},
      router: {currentState: {name: states.APP_LOGIN}}
    };

    getStateSpy = jasmine.createSpy('getStateSpy').and.callFake(args => state);
    dispatchSpy = jasmine.createSpy('dispatchSpy').and.callFake(args => null);

    store = {
      getState: getStateSpy,
      dispatch: dispatchSpy
    };
  });

  it('should call getState', () => {
    spyOn(localStorage, 'getItem').and.callFake(args => null);
    const action = {
      type: types.REGISTER
    };
    routerMiddleware(store)(next)(action);
    expect(store.getState).toHaveBeenCalled();
  });

  it('should call next action', () => {
    spyOn(localStorage, 'getItem').and.callFake(args => null);
    routerMiddleware(store)(next)(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  describe('REGISTER, LOGIN, LOGOUT', () => {
    let payload: any;

    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.callFake(args => null);
      action = {
        type: types.LOGIN
      };
      payload = stateGo(state.app.redirectToState);
    });

    it('should dispatch redirectToState', () => {
      routerMiddleware(store)(next)(action);
      expect(store.dispatch).toHaveBeenCalledWith(payload);
    });

    describe('redirect to same page', () => {
      it('should not dispatch redirectToState', () => {
        state.router.currentState.name = state.app.redirectToState;
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).not.toHaveBeenCalledWith(payload);
      });
    });

    describe('redirect param is empty', () => {
      it('should not dispatch redirectToState', () => {
        state.app.redirectToState = null;
        payload = stateGo(state.app.redirectToState);
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).not.toHaveBeenCalledWith(payload);
      });
    });
  });

  describe('ROUTER_ON_SUCCESS', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.callFake(args => null);
      action = {
        type: types.ROUTER_ON_SUCCESS,
        payload: {fromState: {name: ''}}
      };
    });

    describe('APP_LOGIN', () => {
      it('should dispatch loginUnloaded', () => {
        action.payload.fromState.name = states.APP_LOGIN;
        const payload = appActions.loginUnloaded();
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).toHaveBeenCalledWith(payload);
      });
    });

    describe('APP_REGISTER', () => {
      it('should dispatch registerUnloaded', () => {
        action.payload.fromState.name = states.APP_REGISTER;
        const payload = appActions.registerUnloaded();
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).toHaveBeenCalledWith(payload);
      });
    });

    describe('APP_MAIN', () => {
      it('should dispatch homeUnloaded', () => {
        action.payload.fromState.name = states.APP_MAIN;
        const payload = appActions.homeUnloaded();
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).toHaveBeenCalledWith(payload);
      });
    });
  });

  describe('ROUTER_ON_START', () => {
    beforeEach(() => {
      action = {
        type: types.ROUTER_ON_START,
        payload: {fromState: {name: ''}}
      };
    });

    describe('token set and tokenExpire datetime passed', () => {
      it('should dispatch validateToken', () => {
        const token = 'TOKEN';
        const now = Date.now() - TOKEN_TTL_SEC;
        state.app.token = token;
        spyOn(localStorage, 'getItem').and.callFake(args => now);
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).toHaveBeenCalled();
      });
    });

    describe('token and tokenExpire not set', () => {
      it('should not dispatch validateToken', () => {
        spyOn(localStorage, 'getItem').and.callFake(args => null);
        routerMiddleware(store)(next)(action);
        expect(store.dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
