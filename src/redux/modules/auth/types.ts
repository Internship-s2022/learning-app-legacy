import { ActionType } from 'typesafe-actions';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export type AuthProps = {
  token?: string;
  userType: 'SUPER_ADMIN' | 'NORMAL' | undefined;
  isNewUser: boolean | undefined;
  currentUid: string | undefined;
};

export interface State extends AsyncState {
  authenticated: AuthProps;
  newPass: string | undefined;
  error: string | undefined;
}

export interface CredentialsProp {
  email: string;
  password: string;
}

export interface ChangePassProp {
  newPassword: string;
  firebaseUid: string;
}

export enum Actions {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
  LOGOUT_PENDING = 'LOGOUT_PENDING',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_ERROR = 'LOGOUT_ERROR',
  NEW_PASS_PENDING = 'NEW_PASS_PENDING',
  NEW_PASS_SUCCESS = 'NEW_PASS_SUCCESS',
  NEW_PASS_ERROR = 'NEW_PASS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
