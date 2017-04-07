import * as types from '../constants/ActionTypes';

const defaultState = {
  appName: 'TodoList',
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case types.REDIRECT:
      return { ...state, redirectToState: null };
    case types.LOGOUT:
      return { ...state, redirectToState: 'app.login' };
    case types.LOGIN:
    case types.REGISTER:
      return {
        ...state,
        redirectToState: action.error ? null : 'app.main',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case types.HOME_PAGE_UNLOADED:
    case types.LOGIN_PAGE_UNLOADED:
    case types.REGISTER_PAGE_UNLOADED:
      return { ...state, redirectToState: null, viewChangeCounter: state.viewChangeCounter + 1 };
  }

  return state;
};
