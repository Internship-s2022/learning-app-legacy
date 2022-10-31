import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import { Actions } from './auth/types';
import { courseReducer } from './course';
import { postulantReducer } from './postulant';
import { RootAction, RootReducer } from './types';
import uiReducer from './ui/reducer';
import { userReducer } from './user';

const appReducer = combineReducers<RootReducer, RootAction>({
  auth: authReducer,
  course: courseReducer,
  postulant: postulantReducer,
  ui: uiReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === Actions.LOGOUT_SUCCESS) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
