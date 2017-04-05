import todoActions from './todo.actions';
import listActions from './list.actions';
import authActions from './auth.actions';
export default {
  ...todoActions,
  ...listActions,
  ...authActions
};
