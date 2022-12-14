import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  module: undefined,
  modules: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const moduleReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.DISABLE_MODULE_FETCHING:
    case Actions.CREATE_MODULE_FETCHING:
    case Actions.GET_MODULES_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_MODULES_SUCCESS:
      return {
        ...state,
        modules: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.DISABLE_MODULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case Actions.CREATE_MODULE_SUCCESS:
      return {
        ...state,
        module: action.payload.data,
        pagination: initialState.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.CREATE_MODULE_ERROR:
    case Actions.DISABLE_MODULE_ERROR:
    case Actions.GET_MODULES_ERROR:
      return {
        ...state,
        modules: initialState.modules,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };

    default:
      return state;
  }
};

export default moduleReducer;
