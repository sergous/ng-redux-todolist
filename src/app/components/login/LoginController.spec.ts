import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import {combineReducers} from 'redux';
import auth from '../../reducers/auth';
import Login from './';
import { initUser, AuthKeys } from "../../constants";

const reducer = combineReducers({auth});
const LOGIN = 'login';

describe(LOGIN, () => {
  const user = initUser;
  let component;
  let bindings;

  beforeEach(() => {
    angular
      .module(LOGIN, [ngRedux])
      .component(LOGIN, Login)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(reducer);
      });
    angular.mock.module(LOGIN);
  });

  beforeEach(angular.mock.inject($componentController => {
    bindings = {
      user
    };
    component = $componentController(LOGIN, {}, bindings);
  }));

  it('should call handleSubmit', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.handleSubmit();
    const payload = {inProgress: false, errors: null};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call loginUser', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.loginUser(user.email, user.password);
    const payload = {inProgress: false, errors: null};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call changeEmail', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.changeEmail(user.email);
    const payload = {inProgress: false, errors: null, email: user.email};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call changePassword', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.changePassword(user.password);
    const payload = {inProgress: false, errors: null, password: user.password};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });
});
