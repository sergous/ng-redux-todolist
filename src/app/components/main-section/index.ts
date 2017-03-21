import * as angular from 'angular';
import MainSectionController from './MainSectionController';

export default angular
  .module('app.components.MainSection', [])
  .directive('mainSection', () => {
    return {
      template: require('./MainSection.html'),
      controller: MainSectionController,
      controllerAs: 'main',
      bindToController: true,
      restrict: 'E',
      scope: {
        todos: '=',
        filter: '<'
      }
    };
  })
  .name;
