import * as types from '../constants/ActionTypes';
import { initAuth } from "../constants";

export default function auth(state: any = initAuth, action: any) {
  switch (action.type) {
    case types.LOGIN:
    case types.REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case types.LOGIN_PAGE_UNLOADED:
    case types.REGISTER_PAGE_UNLOADED:
      return {};
    case types.ASYNC_START:
      if (action.subtype === types.LOGIN || action.subtype === types.REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case types.UPDATE_FIELD_AUTH:
      return { ...state, errors: null, [action.key]: action.value };
  }

  return state;
};
