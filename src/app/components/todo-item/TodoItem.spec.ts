import * as angular from 'angular';
import 'angular-mocks';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import TodoItem from './';

const todo = {
        text: 'Hello',
        completed: false,
        id: 0
      };

describe('TodoItem', () => {
  let $scope: angular.IRootScopeService;
  let checkbox: HTMLElement;
  let editButton: HTMLElement;
  let deleteButton: HTMLElement;
  let element: JQuery;

  const onCompleteSpy = jasmine.createSpy('onCompleteSpy');
  const onSaveSpy = jasmine.createSpy('onSaveSpy');
  const onDeleteSpy = jasmine.createSpy('onDeleteSpy');
  const bindings = {
    onComplete: onCompleteSpy,
    onSave: onSaveSpy,
    onDelete: onDeleteSpy,
    isEditing: false,
    todo
  };

  beforeEach(() => {
    angular
      .module('todoItem', ['ngMaterial', 'app/components/todo-item/TodoItem.html'])
      .component('todoItem', TodoItem);
    angular.mock.module('todoItem');
  });
  describe('component', () => {
    beforeEach(angular.mock.inject((
      $rootScope: angular.IRootScopeService,
      $compile: angular.ICompileService
    ) => {
      $scope = Object.assign($rootScope.$new(), bindings);
      element = $compile(`<todo-item todo="todo"
                                     is-editing="isEditing"
                                     on-save="onSave()"
                                     on-delete="onDelete()"
                                     on-complete="onComplete()"
                          ></todo-item>`)($scope);
      checkbox = element.find('md-checkbox')[0];
      editButton = element.find('button')[0];
      deleteButton = element.find('button')[1];
    }));

    it('should render correctly', () => {
      $scope.$digest();
      expect(element.find('h3').length).toBe(1);
      expect(element.find('h3')[0].textContent).toContain('Hello');
      expect(element.find('text-input').length).toBe(0);
      expect(checkbox.getAttribute('aria-label')).toContain('Complete');
      expect(editButton.getAttribute('aria-label')).toBe('Edit');
      expect(deleteButton.getAttribute('aria-label')).toBe('Delete');
    });

    describe('edit button click', () => {
      it('should toggle editing', () => {
        editButton.click();
        $scope.$digest();
        expect($scope.isEditing).toBeTruthy();
      });
      it('should show input', () => {
        $scope.isEditing = true;
        $scope.$digest();
        expect(element.find('h3').length).toBe(0);
        expect(element.find('text-input').length).toBe(1);
      });
      it('should hide input', () => {
        $scope.isEditing = false;
        $scope.$digest();
        expect(element.find('h3').length).toBe(1);
        expect(element.find('text-input').length).toBe(0);
      });
    });

    describe('complete checkbox', () => {
      it('should render not completed todo', () => {
        $scope.todo = {...todo, completed: false};
        $scope.$digest();
        expect(checkbox.getAttribute('aria-checked')).toBe('false');
      });
      it('should render completed todo', () => {
        $scope.todo = {...todo, completed: true};
        $scope.$digest();
        expect(checkbox.getAttribute('aria-checked')).toBe('true');
      });
      it('should call onComplete', () => {
        checkbox.click();
        expect(onCompleteSpy).toHaveBeenCalled();
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
