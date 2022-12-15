import { combineReducers } from 'redux';

import { admissionTestReducer } from './admission-test';
import authReducer from './auth/reducer';
import { Actions } from './auth/types';
import { courseReducer } from './course';
import { courseUserReducer } from './course-user';
import { groupReducer } from './group';
import { moduleReducer } from './module';
import { postulantReducer } from './postulant';
import { postulantCourseReducer } from './postulant-course';
import { questionReducer } from './question';
import { registrationFormReducer } from './registration-form';
import { reportReducer } from './report';
import { RootAction, RootReducer } from './types';
import uiReducer from './ui/reducer';
import { userReducer } from './user';

const appReducer = combineReducers<RootReducer, RootAction>({
  admissionTest: admissionTestReducer,
  auth: authReducer,
  course: courseReducer,
  courseUser: courseUserReducer,
  postulant: postulantReducer,
  ui: uiReducer,
  user: userReducer,
  registrationForm: registrationFormReducer,
  postulantCourse: postulantCourseReducer,
  report: reportReducer,
  module: moduleReducer,
  question: questionReducer,
  group: groupReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === Actions.LOGOUT_SUCCESS) state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
