import * as angular from 'angular';

const Footer: angular.IComponentOptions = {
  template: require('./Footer.html'),
  bindings: {
    selectedFilter: '<filter',
    onClearCompleted: '&',
    onSetFilter: '&'
  }
};
export default Footer;
