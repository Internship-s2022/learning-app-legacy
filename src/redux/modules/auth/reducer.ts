import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

export const initialState: State = {
  authenticated: {
    userType: undefined,
    isNewUser: undefined,
    currentUid: undefined,
  },
  userInfo: {
    courses: [],
    currentUser: {
      _id: undefined,
      isInternal: undefined,
      isActive: undefined,
      postulant: {
        _id: undefined,
        birthDate: undefined,
        country: undefined,
        dni: undefined,
        email: undefined,
        phone: undefined,
        isActive: undefined,
        firstName: undefined,
        lastName: undefined,
      },
      isNewUser: true,
      email: undefined,
      firebaseUid: undefined,
    },
  },
  pagination: undefined,
  studentReports: [],
  studentGroupHistory: [],
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
};

const authReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.LOGIN_FETCHING:
    case Actions.GET_ME_FETCHING:
    case Actions.LOGOUT_FETCHING:
    case Actions.NEW_PASS_FETCHING:
    case Actions.GET_STUDENT_REPORTS_FETCHING:
    case Actions.GET_STUDENT_HISTORY_FETCHING:
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
    case Actions.GET_ME_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case Actions.SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: action.payload,
      };
    case Actions.LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: initialState.authenticated,
        isLoading: false,
      };
    case Actions.NEW_PASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.GET_STUDENT_REPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentReports: action.payload,
      };
    case Actions.GET_STUDENT_HISTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentGroupHistory: action.payload,
      };
    case Actions.LOGOUT_ERROR:
    case Actions.NEW_PASS_ERROR:
    case Actions.GET_ME_ERROR:
    case Actions.LOGIN_ERROR:
    case Actions.GET_STUDENT_REPORTS_ERROR:
    case Actions.GET_STUDENT_HISTORY_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.CLEAR_STUDENT_FLOW:
      return {
        ...state,
        studentGroupHistory: [],
        studentReports: [],
      };
    default:
      return state;
  }
};

export default authReducer;
