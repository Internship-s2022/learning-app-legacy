import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

export const initialState: State = {
  user: undefined,
  users: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const userReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_USERS_FETCHING:
    case Actions.DELETE_USERS_FETCHING:
    case Actions.CREATE_MANUAL_USER_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.CREATE_MANUAL_USER_ERROR:
    case Actions.DELETE_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        users: [],
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.DELETE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.CREATE_MANUAL_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        pagination: initialState.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Actions.SET_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };
    case Actions.RESET_QUERY:
      return {
        ...state,
        filterQuery: initialState.filterQuery,
      };
    case Actions.RESET_ERROR:
      return {
        ...state,
        errorData: initialState.errorData,
      };
    default:
      return state;
  }
};

export default userReducer;
