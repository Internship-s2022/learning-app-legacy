import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  open: false,
};

const modalReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.SET_MODAL:
      return {
        ...state,
        open: action.payload,
      };
    default:
      return state;
  }
};

export default modalReducer;
