import * as types from '../constants/ActionTypes';
import * as states from '../constants/RouterStates';
import appActions from '../actions/app.actions';
import { stateGo,
         stateReload,
         stateTransitionTo } from "redux-ui-router";

const routerMiddleware = store => next => action => {
    const state = store.getState();

    switch (action.type) {
      case types.LOGIN:
        if (state.app.redirectToState && state.router.currentState.name !== state.app.redirectToState) {
          store.dispatch(stateGo(state.app.redirectToState));
        }
        break;
      case types.ROUTER_ON_START:
        const token = localStorage.getItem('sessionToken');
        if (token) {
          store.dispatch(appActions.validateToken(token));
        }
        break;
      case types.ROUTER_ON_SUCCESS:
        if (action.payload.fromState.name === states.APP_LOGIN) {
          store.dispatch(appActions.loginUnloaded());
        }
        break;
    }

    next(action);
};

export { routerMiddleware };
