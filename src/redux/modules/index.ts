import { combineReducers } from 'redux';

import { RootAction, RootReducer } from './types';
import { userReducer } from './user';

const rootReducer = combineReducers<RootReducer, RootAction>({
  user: userReducer,
});

export default rootReducer;
