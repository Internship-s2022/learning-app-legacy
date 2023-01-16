import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  reportsByModule: [],
  reportsByCourse: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const reportReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_REPORT_QUERY:
      return {
        ...state,
        filterQuery: action.payload,
      };
    case Actions.RESET_REPORT_QUERY:
      return {
        ...state,
        filterQuery: initialState.filterQuery,
      };
    case Actions.EDIT_REPORT_FETCHING:
    case Actions.GET_REPORTS_BY_COURSE_ID_FETCHING:
    case Actions.GET_REPORTS_BY_MODULE_ID_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_REPORTS_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        reportsByCourse: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.EDIT_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.GET_REPORTS_BY_MODULE_ID_SUCCESS:
      return {
        ...state,
        reportsByModule: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_REPORTS_BY_MODULE_ID_ERROR:
    case Actions.GET_REPORTS_BY_COURSE_ID_ERROR:
      return {
        ...state,
        reportsByCourse: initialState.reportsByCourse,
        reportsByModule: initialState.reportsByModule,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    case Actions.EDIT_REPORT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    default:
      return state;
  }
};

export default reportReducer;
