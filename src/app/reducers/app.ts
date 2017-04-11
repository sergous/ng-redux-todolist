import * as types from '../constants/ActionTypes';
import * as states from '../constants/RouterStates';
import { initApp } from "../constants";

export default (state = initApp, action) => {
  switch (action.type) {
    case types.APP_LOAD:
    case types.VALIDATE_TOKEN:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload && action.payload.user
                     ? action.payload.user
                     : null
      };
    case types.REDIRECT:
      return { ...state, redirectToState: null };
    case types.LOGOUT:
      return { ...state, redirectToState: states.APP_LOGIN };
    case types.LOGIN:
    case types.REGISTER:
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
