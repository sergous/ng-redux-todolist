import * as types from '../constants/ActionTypes';
import * as states from '../constants/RouterStates';
import { initApp } from "../constants";

export default (state = initApp, action) => {
  switch (action.type) {
    case types.APP_LOAD:
      return {
        ...state,
        appLoaded: true,
        payload: action.payload,
        token: action.token,
        skipTracking: action.skipTracking
      };
    case types.REDIRECT:
      return { ...state, redirectToState: null };
    case types.LOGOUT:
      return { ...state, redirectToState: states.APP_LOGIN };
    case types.LOGIN:
    case types.REGISTER:
    case types.VALIDATE_TOKEN:
      return {
        ...state,
        redirectToState: action.error ? null : states.APP_MAIN,
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case types.HOME_PAGE_UNLOADED:
      return { ...state, redirectToState: states.APP_MAIN, viewChangeCounter: state.viewChangeCounter + 1 };
    case types.LOGIN_PAGE_UNLOADED:
    case types.REGISTER_PAGE_UNLOADED:
      return { ...state, redirectToState: states.APP_LOGIN, viewChangeCounter: state.viewChangeCounter + 1 };
  }

  return state;
};
