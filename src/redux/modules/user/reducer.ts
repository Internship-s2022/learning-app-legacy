import { Reducer } from 'redux';

import { Actions, ActionsType, State } from './types';

const initialState: State = {
  counter: 0,
  user: undefined,
  users: [],
  isLoading: false,
  error: undefined,
};

const userReducer: Reducer<State, ActionsType> = (state = initialState, action): State => {
  switch (action.type) {
    case Actions.INCREMENT:
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    case Actions.DECREMENT:
      return { ...state, counter: state.counter - action.payload };

    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Actions.GET_USERS_FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case Actions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: undefined,
      };
    case Actions.GET_USERS_ERROR:
      return {
        ...state,
        users: [],
        isLoading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default userReducer;
