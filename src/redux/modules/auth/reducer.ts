import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  authenticated: {
    token: undefined,
    userType: undefined,
    isNewUser: undefined,
    currentUid: undefined,
  },
  newPass: undefined,
  isLoading: false,
  errorData: {
    message: '',
    error: false,
    status: 0,
    statusText: '',
    headers: undefined,
    config: undefined,
    request: undefined,
  },
};

const authReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: action.payload,
        isLoading: false,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
      };
    }
    case Actions.LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: initialState.authenticated,
        isLoading: false,
      };
    case Actions.LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.NEW_PASS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.NEW_PASS_SUCCESS:
      return {
        ...state,
        newPass: action.payload,
        isLoading: false,
      };
    case Actions.NEW_PASS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case Actions.NEW_PASS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.NEW_PASS_SUCCESS:
      return {
        ...state,
        newPass: action.payload,
        isLoading: false,
      };
    case Actions.NEW_PASS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
