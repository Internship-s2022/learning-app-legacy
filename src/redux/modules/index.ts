import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import { postulantReducer } from './postulant';
import { RootAction, RootReducer } from './types';
import uiReducer from './ui/reducer';
import { userReducer } from './user';

const rootReducer = combineReducers<RootReducer, RootAction>({
  user: userReducer,
  postulant: postulantReducer,
  ui: uiReducer,
  auth: authReducer,
});

export default rootReducer;
