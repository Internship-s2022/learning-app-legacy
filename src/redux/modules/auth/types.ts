import { ActionType } from 'typesafe-actions';

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

export interface CredentialsProp {
  email: string;
  password: string;
}

export enum Actions {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  LOGOUT_PENDING = 'LOGOUT_PENDING',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_ERROR = 'LOGOUT_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
