import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';

import { admissionTestTypes } from './admission-test';
import { authTypes } from './auth';
import { courseTypes } from './course';
import { courseUserTypes } from './course-user';
import { postulantTypes } from './postulant';
import { registrationFormTypes } from './registration-form';
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
  registrationForm: registrationFormTypes.State;
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
  | registrationFormTypes.ActionsType;

export interface Params<T = Record<'data', object>> {
  query?: string;
  data?: T;
  id?: string;
}

export type ApiResponse<T> = { message: string; data: T; error: boolean };

export type AppThunk = ActionCreator<ThunkAction<void, RootReducer, null, Action<null>>>;

export type AppDispatch = ThunkDispatch<RootReducer, null, RootAction>;
