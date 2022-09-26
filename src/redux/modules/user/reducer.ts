import { Action } from './actions';
import { Types } from './types';

const initialState = {
  counter: 0,
};

export const counterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case Types.INCREMENT:
      return { ...state, counter: state.counter + action.payload };
    case Types.DECREMENT:
      return { ...state, counter: state.counter - action.payload };
    default:
      return state;
  }
};
