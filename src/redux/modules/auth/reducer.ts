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
    case Actions.LOGOUT:
      return { ...state, authenticated: {}, error: undefined };
    default:
      return state;
  }
};

export default authReducer;
