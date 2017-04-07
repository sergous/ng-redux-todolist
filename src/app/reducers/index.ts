import {combineReducers} from 'redux';
import {router} from 'redux-ui-router';

import todos from './todos';
import lists from './lists';
import auth from './auth';
import app from './app';

const rootReducer = combineReducers({
  todos,
  lists,
  auth,
  app,
  router
});

export default rootReducer;
