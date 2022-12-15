import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';
export const initialState: State = {
  registrationForms: [],
  registrationForm: undefined,
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const registrationFormReducer: Reducer<State, ActionsType> = (
  state = initialState,
  action,
): State => {
  switch (action.type) {
    case Actions.GET_REGISTRATION_FORM_BY_COURSE_ID_FETCHING:
    case Actions.GET_REGISTRATION_FORM_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_REGISTRATION_FORM_BY_COURSE_ID_SUCCESS:
      return {
        ...state,
        registrationForm: action.payload,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_REGISTRATION_FORM_SUCCESS:
      return {
        ...state,
        pagination: action.payload.pagination,
        registrationForms: action.payload.data,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_REGISTRATION_FORM_BY_COURSE_ID_ERROR:
    case Actions.GET_REGISTRATION_FORM_ERROR:
      return {
        ...state,
        isLoading: false,
        errorData: action.payload,
      };
    default:
      return state;
  }
};

export default registrationFormReducer;
