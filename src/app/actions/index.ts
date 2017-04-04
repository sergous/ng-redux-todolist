import todoActions from './todo.actions';
import listActions from './list.actions';
export default {
  ...todoActions,
  ...listActions
};
