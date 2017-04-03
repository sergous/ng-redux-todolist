import * as angular from 'angular';
import SidebarListController from "./SidebarListController";

const SidebarList: angular.IComponentOptions = {
  template: require('./SidebarList.html'),
  controller: SidebarListController
};

export default SidebarList;
