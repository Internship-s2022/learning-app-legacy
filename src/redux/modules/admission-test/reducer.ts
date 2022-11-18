import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

export const initialState: State = {
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
    case Actions.DELETE_ADMISSION_TESTS_FETCHING:
    case Actions.PUT_ADMISSION_TESTS_FETCHING:
    case Actions.CREATE_ADMISSION_TESTS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_ADMISSION_TESTS_ERROR:
      return {
        ...state,
        admissionTests: initialState.admissionTests,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.PUT_ADMISSION_TESTS_ERROR:
    case Actions.DELETE_ADMISSION_TESTS_ERROR:
    case Actions.CREATE_ADMISSION_TESTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.DELETE_ADMISSION_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.PUT_ADMISSION_TESTS_SUCCESS:
      return {
        ...state,
        admissionTests: state.admissionTests.map((test) =>
          test._id === action.payload.data._id ? action.payload.data : test,
        ),
        admissionTest: action.payload.data,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_ADMISSION_TESTS_SUCCESS:
      return {
        ...state,
        admissionTests: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.CREATE_ADMISSION_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorData: initialState.errorData,
        admissionTests: [...state.admissionTests, action.payload.data],
      };
    case Actions.SET_ADMISSION_TESTS_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };
    case Actions.RESET_ADMISSION_TESTS_QUERY:
      return {
        ...state,
        filterQuery: initialState.filterQuery,
      };
    default:
      return state;
  }
};

export default admissionTestReducer;
