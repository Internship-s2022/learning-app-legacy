import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  admissionTest: undefined,
  admissionTests: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const admissionTestReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_ADMISSION_TEST:
      return {
        ...state,
        admissionTest: action.payload,
      };
    case Actions.GET_ADMISSION_TESTS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_ADMISSION_TESTS_SUCCESS:
      return {
        ...state,
        admissionTests: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_ADMISSION_TESTS_ERROR:
      return {
        ...state,
        admissionTests: [],
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    case Actions.DELETE_ADMISSION_TESTS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.DELETE_ADMISSION_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.DELETE_ADMISSION_TESTS_ERROR:
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

export default admissionTestReducer;
