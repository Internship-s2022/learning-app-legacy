import { Reducer } from 'redux';

import { entityInitialState } from 'src/constants/redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  groups: [],
  group: undefined,
  isLoading: false,
  filterQuery: '',
  ...entityInitialState,
};

const groupdReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.GET_GROUPS_FETCHING:
    case Actions.CREATE_GROUP_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_GROUPS_SUCCESS:
      return {
        ...state,
        groups: action.payload.data,
        pagination: action.payload.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        group: action.payload.data,
        pagination: initialState.pagination,
        isLoading: false,
        errorData: initialState.errorData,
      };
    case Actions.GET_GROUPS_ERROR:
      return {
        ...state,
        groups: initialState.groups,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    case Actions.CREATE_GROUP_ERROR:
      return {
        ...state,
        group: initialState.group,
        isLoading: false,
        errorData: action.payload,
        pagination: initialState.pagination,
      };
    default:
      return state;
  }
};

export default groupdReducer;
