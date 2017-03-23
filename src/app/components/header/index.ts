import * as angular from 'angular';
import HeaderController from './HeaderController';

const Header: angular.IComponentOptions = {
  template: require('./Header.html'),
  controller: HeaderController,
  bindings: {
    todos: '='
  }
};

export default Header;
