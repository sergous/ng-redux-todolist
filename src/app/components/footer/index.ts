import * as angular from 'angular';
import FooterController from './FooterController';

const Footer: angular.IComponentOptions = {
  template: require('./Footer.html'),
  controller: FooterController,
  bindings: {
    completedCount: '<',
    activeCount: '<',
    selectedFilter: '<filter',
    onClearCompleted: '&',
    onSetFilter: '&'
  }
};
export default Footer;
