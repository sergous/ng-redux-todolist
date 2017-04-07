import agent from '../agents/localStorage.agent';
import * as types from '../constants/ActionTypes';

const localStorageMiddleware = store => next => action => {
  if (action.type === types.REGISTER || action.type === types.LOGIN) {
    if (!action.error) {
      localStorage.setItem('sessionToken', action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === types.LOGOUT) {
    localStorage.setItem('sessionToken', '');
    agent.setToken(null);
  }

  next(action);
};

export { localStorageMiddleware };
