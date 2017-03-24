import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import MainSection from './';
import rootReducer from '../../reducers/index';

describe('MainSection component', () => {
  let component;

  beforeEach(() => {
    angular
      .module('mainSection', [ngRedux, 'app/components/main-section/MainSection.html'])
      .component('mainSection', MainSection)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(
          rootReducer
        );
      });
    angular.mock.module('mainSection');
  });

  beforeEach(angular.mock.inject($componentController => {
    component = $componentController('mainSection', {}, {});
  }));

  it('shoud call clearCompleted', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.clearCompleted();
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('shoud call completeAll', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.completeAll();
    expect(component.onUpdate).toHaveBeenCalled();
  });

});
