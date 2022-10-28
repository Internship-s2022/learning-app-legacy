import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

export const initialState: State = {
  counter: 0,
  user: undefined,
  users: [],
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
  pagination: {
    totalDocs: 0,
    limit: 5,
    totalPages: 0,
    page: 1,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  filterQuery: '',
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
        errorData: initialState.errorData,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        users: [],
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };

    case Actions.DELETE_USERS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.DELETE_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
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

    default:
      return state;
  }
};

export default userReducer;
