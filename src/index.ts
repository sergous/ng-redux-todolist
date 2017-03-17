import * as angular from 'angular';
import 'todomvc-app-css/index.css';
import 'angular-ui-router';
import ngRedux from 'ng-redux';
import * as createLogger from 'redux-logger';

import {TodoService} from './app/todos/todos';
import {App} from './app/containers/App';
import {Header} from './app/components/Header';
import {MainSection} from './app/components/MainSection';
import {TodoTextInput} from './app/components/TodoTextInput';
import {TodoItem} from './app/components/TodoItem';
import {Footer} from './app/components/Footer';
import routesConfig from './routes';

import './index.scss';
import rootReducer from './app/reducers/index';

const logger = createLogger();

export default angular
  .module('app', ['ui.router', ngRedux])
  .config(routesConfig)
  .service('todoService', TodoService)
  .component('app', App)
  .component('headerComponent', Header)
  .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  .component('todoTextInput', TodoTextInput)
  .component('todoItem', TodoItem)
  .config(($ngReduxProvider) => {
    $ngReduxProvider.createStoreWith(
      rootReducer,
      [logger]
    );
  })
  .name;

