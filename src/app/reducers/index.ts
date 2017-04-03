import {combineReducers} from 'redux';
import todos from './todos';
import lists from './lists';

const rootReducer = combineReducers({
  todos,
  lists
});

export default rootReducer;
