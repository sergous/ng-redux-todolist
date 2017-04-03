import * as angular from 'angular';

const SidebarListItem: angular.IComponentOptions = {
  template: require('./SidebarListItem.html'),
  bindings: {
    item: '<',
    isActive: '<',
    onSave: '&',
    onDelete: '&'
  }
};

export default SidebarListItem;
