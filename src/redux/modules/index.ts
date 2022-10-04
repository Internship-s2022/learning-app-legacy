import { combineReducers } from 'redux';

import { RootAction, RootReducer } from './types';
import { modalReducer } from './ui';
import { userReducer } from './user';

const rootReducer = combineReducers<RootReducer, RootAction>({
  user: userReducer,
  modalState: modalReducer,
});

export default rootReducer;
