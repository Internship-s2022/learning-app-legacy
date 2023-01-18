import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

export const initialState: State = {
  course: undefined,
  courses: [],
  registrationForm: undefined,
  isLoading: false,
  ...entityInitialState,
};

const publicReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_PUBLIC_COURSES_FETCHING:
    case Actions.GET_PUBLIC_REGISTRATION_FORM_FETCHING:
    case Actions.CREATE_POSTULATION_FETCHING:
      return {
        ...state,
        isLoading: true,
        errorData: initialState.errorData,
      };

    case Actions.GET_PUBLIC_COURSES_ERROR:
      return {
        ...state,
        courses: initialState.courses,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.CREATE_POSTULATION_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    case Actions.GET_PUBLIC_REGISTRATION_FORM_ERROR:
      return {
        ...state,
        registrationForm: initialState.registrationForm,
        isLoading: false,
        errorData: action.payload,
      };

    case Actions.GET_PUBLIC_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.data,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_PUBLIC_REGISTRATION_FORM_SUCCESS:
      return {
        ...state,
        registrationForm: action.payload.data,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.CREATE_POSTULATION_SUCCESS:
    case Actions.CLEAR_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: initialState.errorData,
      };
    default:
      return state;
  }
};

export default publicReducer;
