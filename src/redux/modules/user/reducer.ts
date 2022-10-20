import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  counter: 0,
  user: undefined,
  users: [],
  isLoading: false,
  error: undefined,
  pagination: undefined,
};

const userReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Actions.GET_USERS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        users: [],
        isLoading: false,
        error: action.payload.message,
        pagination: undefined,
      };
    default:
      return state;
  }
};

export default userReducer;
