import * as angular from 'angular';
import HeaderController from './HeaderController';

export default angular
  .module('app.components.Header', [])
  .directive('headerComponent', () => {
    return {
      template: require('./Header.html'),
      controller: HeaderController,
      controllerAs: 'header',
      bindToController: true,
      scope: {
        todos: '='
      }
    };
  })
  .name;
