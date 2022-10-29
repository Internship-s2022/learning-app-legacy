import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import { Actions } from './auth/types';
import { postulantReducer } from './postulant';
import { RootAction, RootReducer } from './types';
import uiReducer from './ui/reducer';
import { userReducer } from './user';

const appReducer = combineReducers<RootReducer, RootAction>({
  user: userReducer,
  postulant: postulantReducer,
  ui: uiReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === Actions.LOGOUT_SUCCESS) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
