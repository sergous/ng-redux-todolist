import * as angular from 'angular';
import FooterController from './FooterController';

export default angular
  .module('app.components.Footer', [])
  .directive('footerComponent', () => {
    return {
      template: require('./Footer.html'),
      controller: FooterController,
      controllerAs: 'footer',
      bindToController: true,
      restrict: 'E',
      scope: {
        completedCount: '<',
        activeCount: '<',
        selectedFilter: '<filter',
        onClearCompleted: '&',
        onShow: '&'
      }
    };
  })
  .name;

