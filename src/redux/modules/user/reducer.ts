import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  counter: 0,
};

const userReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.INCREMENT:
      return {
        ...state,
        counter: state.counter + action.payload.counter,
      };
    case Actions.DECREMENT:
      return { ...state, counter: state.counter - action.payload.counter };
    default:
      return state;
  }
};

export default userReducer;
