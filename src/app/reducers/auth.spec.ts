import * as types from '../constants/ActionTypes';
import { initAuth, AuthKeys } from "../constants";
import auth from './auth';

describe('auth reducer', () => {
  const errors = [{message: 'Error'}];
  const textFieldValue = 'some text';

  it('should handle initial state', () => {
    expect(
      auth(undefined, {})
    ).toEqual(initAuth);
  });

  it('should handle LOGIN', () => {
    expect(
      auth({}, {
        type: types.LOGIN,
        error: false
      })
    ).toEqual({
      inProgress: false,
      errors: null
    });

    expect(
      auth({}, {
        type: types.LOGIN,
        error: true,
        payload: {errors}
      })
    ).toEqual({
      inProgress: false,
      errors
    });
  });

  it('should handle REGISTER', () => {
    expect(
      auth({}, {
        type: types.REGISTER,
        error: false
      })
    ).toEqual({
      inProgress: false,
      errors: null
    });

    expect(
      auth({}, {
        type: types.REGISTER,
        error: true,
        payload: {errors}
      })
    ).toEqual({
      inProgress: false,
      errors
    });
  });

  it('should handle REGISTER_PAGE_UNLOADED', () => {
    expect(
      auth({}, {
        type: types.REGISTER_PAGE_UNLOADED
      })
    ).toEqual({});
  });

  it('should handle LOGIN_PAGE_UNLOADED', () => {
    expect(
      auth({}, {
        type: types.LOGIN_PAGE_UNLOADED
      })
    ).toEqual({});
  });

  it('should handle ASYNC_START', () => {
    expect(
      auth({}, {
        type: types.ASYNC_START,
        subtype: types.LOGIN
      })
    ).toEqual({
      inProgress: true
    });
    expect(
      auth({}, {
        type: types.ASYNC_START,
        subtype: types.REGISTER
      })
    ).toEqual({
      inProgress: true
    });
  });

  it('should handle UPDATE_FIELD_AUTH', () => {
    expect(
      auth({}, {
        type: types.UPDATE_FIELD_AUTH,
        key: AuthKeys.email,
        value: textFieldValue
      })
    ).toEqual({
      errors: null,
      [AuthKeys.email]: textFieldValue
    });

    expect(
      auth({}, {
        type: types.UPDATE_FIELD_AUTH,
        key: AuthKeys.password,
        value: textFieldValue
      })
    ).toEqual({
      errors: null,
      [AuthKeys.password]: textFieldValue
    });
  });
});
