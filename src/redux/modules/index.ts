import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import { RootAction, RootReducer } from './types';
import uiReducer from './ui/reducer';
import { userReducer } from './user';

const rootReducer = combineReducers<RootReducer, RootAction>({
  user: userReducer,
  ui: uiReducer,
  auth: authReducer,
});

export default rootReducer;
