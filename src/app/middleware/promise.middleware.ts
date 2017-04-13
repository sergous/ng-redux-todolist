import agent from '../agents/localStorage.agent';
import * as types from "../constants/ActionTypes";

const promiseMiddleware = store => next => action => {
  if (!isPromise(action.payload)) {
    next(action);
    return;
  }

  store.dispatch({ type: types.ASYNC_START, subtype: action.type });

  const currentView = store.getState().app.viewChangeCounter;
  const skipTracking = action.skipTracking;

  action.payload.then(
    res => {
      const currentState = store.getState();
      if (!skipTracking && currentState.app.viewChangeCounter !== currentView) return;

      console.log('RESULT', res);
      action.payload = res;
      store.dispatch({ type: types.ASYNC_END, promise: action.payload });
      store.dispatch(action);
    },
    error => {
      const currentState = store.getState();
      if (!skipTracking && currentState.app.viewChangeCounter !== currentView) return;

      console.log('ERROR', error);
      action.error = true;
      action.payload = error;
      if (!action.skipTracking) {
        store.dispatch({ type: types.ASYNC_END, promise: action.payload });
      }
      store.dispatch(action);
  });
};

function isPromise(v: any) {
  return v && typeof v.then === 'function';
}

export { promiseMiddleware, isPromise };
