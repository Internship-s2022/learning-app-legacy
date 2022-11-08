import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';

import { authTypes } from './auth';
import { courseTypes } from './course';
import { postulantTypes } from './postulant';
import { uiTypes } from './ui';
import { userTypes } from './user';

export interface RootReducer {
  auth: authTypes.State;
  course: courseTypes.State;
  postulant: postulantTypes.State;
  ui: uiTypes.uiState;
  user: userTypes.State;
}

export interface AsyncState {
  isLoading: boolean;
  errorData: ErrorResponse;
  pagination: Pagination | undefined;
}

export type NoParamForAction = '';

export type RootAction =
  | authTypes.ActionsType
  | courseTypes.ActionsType
  | postulantTypes.ActionsType
  | uiTypes.ActionsType
  | userTypes.ActionsType;

export interface Params<T = Record<'data', object>> {
  query?: string;
  data?: T;
  id?: string;
}

export type ApiResponse<T> = { message: string; data: T; error: boolean };

export type AppThunk = ActionCreator<ThunkAction<void, RootReducer, null, Action<null>>>;

export type AppDispatch = ThunkDispatch<RootReducer, null, RootAction>;
