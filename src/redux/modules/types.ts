import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';

import { admissionTestTypes } from './admission-test';
import { authTypes } from './auth';
import { courseTypes } from './course';
import { courseUserTypes } from './course-user';
import { moduleTypes } from './module';
import { postulantTypes } from './postulant';
import { postulantCourseTypes } from './postulant-course';
import { questionTypes } from './question';
import { registrationFormTypes } from './registration-form';
import { reportTypes } from './report';
import { uiTypes } from './ui';
import { userTypes } from './user';

export interface RootReducer {
  admissionTest: admissionTestTypes.State;
  auth: authTypes.State;
  course: courseTypes.State;
  courseUser: courseUserTypes.State;
  postulant: postulantTypes.State;
  ui: uiTypes.uiState;
  user: userTypes.State;
  postulantCourse: postulantCourseTypes.State;
  registrationForm: registrationFormTypes.State;
  report: reportTypes.State;
  module: moduleTypes.State;
  question: questionTypes.State;
}

export interface AsyncState {
  isLoading: boolean;
  errorData: ErrorResponse;
  pagination: Pagination | undefined;
}

export type NoParamForAction = '';

export type RootAction =
  | admissionTestTypes.ActionsType
  | authTypes.ActionsType
  | courseTypes.ActionsType
  | courseUserTypes.ActionsType
  | postulantTypes.ActionsType
  | uiTypes.ActionsType
  | userTypes.ActionsType
  | registrationFormTypes.ActionsType
  | postulantCourseTypes.ActionsType
  | reportTypes.ActionsType
  | moduleTypes.ActionsType;
  | questionTypes.ActionsType
  | registrationFormTypes.ActionsType;

export interface Params<T = Record<'data', object>> {
  query?: string;
  data?: T;
  id?: string;
}

export type ApiResponse<T> = { message: string; data: T; error: boolean };

export type AppThunk = ActionCreator<ThunkAction<void, RootReducer, null, Action<null>>>;

export type AppDispatch = ThunkDispatch<RootReducer, null, RootAction>;
