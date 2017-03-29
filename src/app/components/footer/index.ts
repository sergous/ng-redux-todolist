import * as angular from 'angular';

const Footer: angular.IComponentOptions = {
  template: require('./Footer.html'),
  bindings: {
    todos: '<',
    activeCount: '<',
    completedCount: '<',
    onCompleteAll: '&',
    onClearCompleted: '&'
  }
};
export default Footer;
