import { Reducer } from 'redux';

import { Actions, ActionsType, uiState } from './types';

const initialState: uiState = {
  modal: { title: '', open: false, type: 'alert' },
};

const uiReducer: Reducer<uiState, ActionsType> = (state = initialState, action): uiState => {
  switch (action.type) {
    case Actions.OPEN_MODAL:
      return {
        ...state,
        modal: { ...action.payload, open: true },
      };
    case Actions.HIDE_MODAL:
      return { ...state, modal: { ...state.modal, open: false } };
    default:
      return state;
  }
};

export default uiReducer;
