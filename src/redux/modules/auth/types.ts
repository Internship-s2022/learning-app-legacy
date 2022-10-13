import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface AuthProps {
  token?: string;
  userType?: 'SUPER_ADMIN' | 'NORMAL';
}

export interface State {
  isLoading: boolean;
  authenticated: AuthProps;
  error: string | undefined;
}

export interface credentialsProp {
  email: string;
  password: string;
}

export enum Actions {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT = 'LOGOUT',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;

export type AppThunk = ActionCreator<ThunkAction<void, RootReducer, null, Action<null>>>;
