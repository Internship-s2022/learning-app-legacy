import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  courseUser: undefined,
  courseUsers: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const courseUserReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_COURSES_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };
    case Actions.RESET_COURSES_QUERY:
      return {
        ...state,
        filterQuery: initialState.filterQuery,
      };
    case Actions.GET_USERS_BY_COURSE_ID_FETCHING:
    case Actions.DISABLE_BY_USER_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_USERS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        courseUsers: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.DISABLE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.DISABLE_BY_USER_ID_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.GET_USERS_BY_COURSE_ID_ERROR:
      return {
        ...state,
        courseUsers: initialState.courseUsers,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    default:
      return state;
  }
};

export default courseUserReducer;
