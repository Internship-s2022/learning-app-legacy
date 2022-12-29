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
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_PUBLIC_COURSES_ERROR:
      return {
        ...state,
        courses: initialState.courses,
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
    default:
      return state;
  }
};

export default publicReducer;
