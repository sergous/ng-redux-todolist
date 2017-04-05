import * as angular from 'angular';
import { combineReducers } from 'redux';
import lists from '../../reducers/lists';
import SidebarList from './';
import ngRedux from 'ng-redux';

const reducer = combineReducers({
  lists
});

describe('SidebarList controller', () => {
  const lists = [
    {id: 0, name: 'Default'},
    {id: 1, name: 'Shopping List'}
  ];
  const onSelectListSpy = jasmine.createSpy('onSelectListSpy');
  let component;
  let bindings = {
    lists,
    listId: 0,
    onSelectList: onSelectListSpy,
    isAdding: false,
    isConfig: false,
  };

  beforeEach(() => {
    angular
      .module('sidebarList', [ngRedux, 'app/components/sidebar-list/SidebarList.html'])
      .component('sidebarList', SidebarList)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          reducer
        );
      });
    angular.mock.module('sidebarList');
  });

  beforeEach(angular.mock.inject($componentController => {
    component = $componentController('sidebarList', {}, bindings);
    spyOn(component, 'onUpdate').and.callThrough();
  }));

  it('should render call addList', () => {
    component.addList('New list');
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('should render call deleteList', () => {
    component.deleteList(0);
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('should render call editList', () => {
    component.editList(0, 'New list name');
    expect(component.onUpdate).toHaveBeenCalled();
  });
});
