import * as angular from 'angular';
import '../node_modules/angular-material/angular-material.css';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';

import ngRedux from 'ng-redux';
import { compose } from 'redux';
import * as createLogger from 'redux-logger';
import ngReduxDevTools from 'ng-redux-dev-tools';
import devToolsEnhancer from 'remote-redux-devtools';
import * as persistState from 'redux-localstorage';

import router from './app/router';
import {TodoService} from './app/todos/todos';
import routesConfig from './routes';
import components from './app/components';

import './index.scss';
import rootReducer from './app/reducers/index';
import {App} from './app/containers/App';

const logger = createLogger();

const localStorageEnhancer = compose(
  persistState(/*paths, config*/),
);

export default angular
  .module('app', [
    'ngMaterial',
    router,
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
      [devToolsEnhancer({ realtime: true }), localStorageEnhancer]
    );
  })
  .name;

