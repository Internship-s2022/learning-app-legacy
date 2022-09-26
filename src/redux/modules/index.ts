import { combineReducers } from 'redux';

import { userReducer, userTypes } from './user';

export interface RootReducer {
  counter: userTypes.State;
}

export type RootAction = userTypes.ActionsType;

const rootReducer = combineReducers({
  counter: userReducer,
});

export default rootReducer;
