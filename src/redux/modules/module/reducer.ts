import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  modules: [],
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const moduleReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
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
