import {combineReducers} from 'redux';
import todos from './todos';
import lists from './lists';
import auth from './auth';

const rootReducer = combineReducers({
  todos,
  lists,
  auth
});

export default rootReducer;
