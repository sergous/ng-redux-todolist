import {combineReducers} from 'redux';
import todos from './todos';
import lists from './lists';
import auth from './auth';
import app from './app';

const rootReducer = combineReducers({
  todos,
  lists,
  auth,
  app
});

export default rootReducer;
