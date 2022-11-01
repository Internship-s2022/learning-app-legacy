import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  course: undefined,
  courses: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const courseReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_COURSE:
      return {
        ...state,
        course: action.payload,
      };
    case Actions.GET_COURSES_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_COURSES_ERROR:
      return {
        ...state,
        courses: [],
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    case Actions.DELETE_COURSES_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.DELETE_COURSES_ERROR:
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

export default courseReducer;
