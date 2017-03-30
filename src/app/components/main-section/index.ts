import * as angular from 'angular';
import MainSectionController from './MainSectionController';

const MainSection: angular.IComponentOptions = {
  template: require('./MainSection.html'),
  controller: MainSectionController
};

export default MainSection;
