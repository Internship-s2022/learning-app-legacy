import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  postulant: undefined,
  isLoading: false,
  ...entityInitialState,
};

const postulantReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_POSTULANT_BY_DNI_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_POSTULANT_BY_DNI_SUCCESS:
      return {
        ...state,
        postulant: action.payload.data,
        pagination: undefined,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_POSTULANT_BY_DNI_ERROR:
      return {
        ...state,
        postulant: undefined,
        isLoading: false,
        errorData: action.payload,
        pagination: undefined,
      };
    case Actions.PUT_POSTULANT_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.PUT_POSTULANT_SUCCESS:
      return {
        ...state,
        postulant: action.payload.data,
        pagination: undefined,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.PUT_POSTULANT_ERROR:
      return {
        ...state,
        postulant: undefined,
        isLoading: false,
        errorData: action.payload,
        pagination: undefined,
      };
    default:
      return state;
  }
};

export default postulantReducer;
