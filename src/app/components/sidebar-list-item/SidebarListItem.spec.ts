import * as angular from 'angular';
import 'angular-mocks';
import SidebarListItem from './';

const item = {
        name: 'Default',
        id: 0
      };

describe('SidebarListItem', () => {
  let $scope: angular.IRootScopeService;
  let listItem: HTMLElement;
  let editButton: HTMLElement;
  let deleteButton: HTMLElement;
  let element: JQuery;

  const onSaveSpy = jasmine.createSpy('onSaveSpy');
  const onDeleteSpy = jasmine.createSpy('onDeleteSpy');
  const bindings = {
    onSave: onSaveSpy,
    onDelete: onDeleteSpy,
    editing: false,
    isActive: true,
    isConfig: true,
    item
  };

  beforeEach(() => {
    angular
      .module('sidebarListItem', ['app/components/sidebar-list-item/SidebarListItem.html'])
      .component('sidebarListItem', SidebarListItem);
    angular.mock.module('sidebarListItem');
  });
  describe('element', () => {
    beforeEach(angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      $scope = Object.assign($rootScope.$new(), bindings);
      element = $compile(`<sidebar-list-item  item="item"
                                              editing="editing"
                                              is-active="isActive"
                                              is-config="isConfig"
                                              on-save="onSave()"
                                              on-delete="onDelete()"
                          ></sidebar-list-item>`)($scope);
      $scope.$digest();
      const buttons = element.find('md-button');
      expect(buttons.length).toBe(3);
      [ listItem, editButton, deleteButton ] = [].slice.call(buttons);
    }));

    it('should render correctly', () => {
      $scope.$digest();
      const item = element.find('md-list-item')[0];
      expect(item.classList).toContain('md-active');
      expect(element.find('todo-text-input').length).toBe(0);
      expect(listItem.textContent).toContain($scope.item.name);
      expect(listItem.classList).toContain('md-primary');
      expect(editButton.textContent).toContain('mode_edit');
      expect(deleteButton.textContent).toContain('remove');
    });

    describe('edit button', () => {
      it('should toggle editing', () => {
        editButton.click();
        $scope.$digest();
        expect($scope.editing).toBeTruthy();
      });
      it('should hide input', () => {
        $scope.editing = false;
        $scope.$digest();
        expect(element.find('md-button').length).toBe(3);
        expect(element.find('todo-text-input').length).toBe(0);
      });
      it('should show input', () => {
        $scope.editing = true;
        $scope.$digest();
        expect(element.find('md-button').length).toBe(2);
        const textInput = element.find('todo-text-input');
        expect(textInput.length).toBe(1);
      });
    });

    describe('delete button', () => {
      it('should call onDelete', () => {
        deleteButton.click();
        expect(onDeleteSpy).toHaveBeenCalled();
      });
    });
  });
});
