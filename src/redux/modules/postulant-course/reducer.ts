import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  correctedPostulantCourses: [],
  notCorrectedPostulantCourses: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const postulantCourseReducer: Reducer<State, ActionsType> = (
  state = initialState,
  action,
): State => {
  switch (action.type) {
    case Actions.SET_POSTULANT_COURSE_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };
    case Actions.RESET_POSTULANT_COURSE_QUERY:
      return {
        ...state,
        filterQuery: initialState.filterQuery,
      };
    case Actions.GET_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING:
    case Actions.GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING:
    case Actions.PROMOTE_POSTULANTS_FETCHING:
    case Actions.CORRECT_TESTS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        correctedPostulantCourses: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        notCorrectedPostulantCourses: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.PROMOTE_POSTULANTS_SUCCESS:
    case Actions.CORRECT_TESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR:
    case Actions.GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR:
    case Actions.PROMOTE_POSTULANTS_ERROR:
    case Actions.CORRECT_TESTS_ERROR:
      return {
        ...state,
        correctedPostulantCourses: initialState.correctedPostulantCourses,
        notCorrectedPostulantCourses: initialState.notCorrectedPostulantCourses,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    default:
      return state;
  }
};

export default postulantCourseReducer;
