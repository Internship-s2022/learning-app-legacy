import { ActionType } from 'typesafe-actions';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface AuthProps {
  token?: string;
  userType?: 'SUPER_ADMIN' | 'NORMAL';
}

export interface State extends AsyncState {
  authenticated: AuthProps;
}

export interface CredentialsProp {
  email: string;
  password: string;
}

export enum Actions {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
  LOGOUT_PENDING = 'LOGOUT_PENDING',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_ERROR = 'LOGOUT_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
