import * as angular from 'angular';
import 'angular-mocks';
import ngRedux from 'ng-redux';
import {combineReducers} from 'redux';
import auth from '../../reducers/auth';
import Register from './';
import { initUser, AuthKeys } from "../../constants/index";

const reducer = combineReducers({auth});
const REGISTER = 'register';

describe(REGISTER, () => {
  const user = initUser;
  let component;
  let bindings;

  beforeEach(() => {
    angular
      .module(REGISTER, [ngRedux])
      .component(REGISTER, Register)
      .config(($ngReduxProvider) => {
        $ngReduxProvider.createStoreWith(reducer);
      });
    angular.mock.module(REGISTER);
  });

  beforeEach(angular.mock.inject($componentController => {
    bindings = {
      user
    };
    component = $componentController(REGISTER, {}, bindings);
  }));

  it('should call handleSubmit', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.handleSubmit();
    const payload = {inProgress: false, errors: null};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call registerUser', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.registerUser(user.email, user.password);
    const payload = {inProgress: false, errors: null};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call changeEmail', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.changeEmail(user.email);
    const payload = {inProgress: false, errors: null, email: user.email};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call changeUsername', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.changeUsername(user.username);
    const payload = {inProgress: false, errors: null, username: user.username};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });

  it('should call changePassword', () => {
    spyOn(component, 'onUpdate').and.callThrough();
    component.changePassword(user.password);
    const payload = {inProgress: false, errors: null, password: user.password};
    expect(component.onUpdate).toHaveBeenCalledWith({auth: payload});
  });
});
