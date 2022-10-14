import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  authenticated: {},
  isLoading: false,
  error: undefined,
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
        error: action.payload,
      };
    case Actions.LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: {},
        isLoading: false,
      };
    case Actions.LOGOUT_ERROR:
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
