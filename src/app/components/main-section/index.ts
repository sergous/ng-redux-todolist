import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import MainSectionController from './MainSectionController';
import mainRouterConfig from './main-router-config';

export default angular
  .module('app.components.MainSection', [uiRouter])
  .controller('MainSectionController', MainSectionController)
  .directive('mainSection', () => {
    return {
      template: require('./MainSection.html'),
      controller: MainSectionController,
      controllerAs: 'main',
      bindToController: true,
      restrict: 'E',
      scope: {
        todos: '=',
      }
    };
  })
  .config(mainRouterConfig)
  .name;
