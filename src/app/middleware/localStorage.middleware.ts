import agent from '../agents/localStorage.agent';
import * as types from '../constants/ActionTypes';
import { TOKEN_TTL_SEC, SESSION_TOKEN_KEY, SESSION_TTL_KEY, TOKEN_TTL_KEY, SESSION_TTL_SEC } from "../constants";

const localStorageMiddleware = store => next => action => {
  switch (action.type) {
    case types.REGISTER:
    case types.LOGIN:
    case types.VALIDATE_TOKEN:
      if (action.error) break;
      if (!(action.payload && action.payload.user)) break;

      localStorage.setItem(SESSION_TOKEN_KEY, action.payload.user.token);
      agent.setToken(action.payload.user.token);

      setLocalStoreTTL(TOKEN_TTL_KEY, TOKEN_TTL_SEC);
      setLocalStoreTTL(SESSION_TTL_KEY, SESSION_TTL_SEC);
      break;
    case types.LOGOUT:
      localStorage.setItem(SESSION_TOKEN_KEY, '');

      setLocalStoreTTL(TOKEN_TTL_KEY);
      setLocalStoreTTL(SESSION_TTL_KEY);

      agent.setToken(null);
      break;
  }
  next(action);
};

function setLocalStoreTTL(key: string, ttl_sec: number = 0) {
  const ttl: string = '' + Date.now() + ttl_sec * 1000;
  localStorage.setItem(key, ttl);
}

export { localStorageMiddleware, setLocalStoreTTL };
