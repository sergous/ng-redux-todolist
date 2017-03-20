import * as angular from 'angular';
import 'todomvc-app-css/index.css';
import 'angular-ui-router';
import ngRedux from 'ng-redux';
import * as createLogger from 'redux-logger';
import ngReduxDevTools from 'ng-redux-dev-tools';
import devToolsEnhancer from 'remote-redux-devtools';

import {TodoService} from './app/todos/todos';
import routesConfig from './routes';
import components from './app/components';

import './index.scss';
import rootReducer from './app/reducers/index';
import {App} from './app/containers/App';

const logger = createLogger();

export default angular
  .module('app', [
    'ui.router',
    ngRedux,
    ngReduxDevTools,
    components
  ])
  .config(routesConfig)
  .service('todoService', TodoService)
  .component('app', App)
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(
      rootReducer,
      [logger],
      [devToolsEnhancer({ realtime: true })]
    );
  })
  .name;

