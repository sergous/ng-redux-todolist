import * as types from '../constants/ActionTypes';
import * as states from '../constants/RouterStates';
import appActions from '../actions/app.actions';
import { stateGo,
         stateReload,
         stateTransitionTo
} from "redux-ui-router";
import { SESSION_TOKEN_KEY, SESSION_TTL_KEY, TOKEN_TTL_KEY } from "../constants";

const routerMiddleware = store => next => action => {
    const state = store.getState();

    switch (action.type) {
      case types.REGISTER:
      case types.LOGIN:
      case types.LOGOUT:
        if (state.app.redirectToState && state.router.currentState.name !== state.app.redirectToState) {
          store.dispatch(stateGo(state.app.redirectToState));
        }
        break;
      case types.VALIDATE_TOKEN:
        const sessionExpire = parseInt(localStorage.getItem(SESSION_TTL_KEY), 10);

        // todo: redirect from register and login to main state if session exists
        // if (state.router.currentState.name === states.APP_MAIN) break;
        // if (sessionExpire < Date.now()) break;
        // store.dispatch(stateGo(states.APP_MAIN));
        break;
      case types.ROUTER_ON_START:
        const token = state.app.token || localStorage.getItem(SESSION_TOKEN_KEY);
        const tokenExpire = parseInt(localStorage.getItem(TOKEN_TTL_KEY), 10);

        if (!token || !tokenExpire) break;
        if (tokenExpire > Date.now()) break;

        store.dispatch(appActions.validateToken(token));
        break;
      case types.ROUTER_ON_SUCCESS:
        switch (action.payload.fromState.name) {
          case states.APP_LOGIN     : store.dispatch(appActions.loginUnloaded()); break;
          case states.APP_REGISTER  : store.dispatch(appActions.registerUnloaded()); break;
          case states.APP_MAIN      : store.dispatch(appActions.homeUnloaded()); break;
        }
        break;
    }

    next(action);
};

export { routerMiddleware };
