import { ActionType } from 'typesafe-actions';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export type UserType = 'SUPER_ADMIN' | 'ADMIN' | 'NORMAL';
export interface GetMyInfo {
  name: string;
  lastName: string;
}
export interface AuthProps {
  userType: UserType | undefined;
  isNewUser: boolean | undefined;
  currentUid: string | undefined;
  userInfo?: GetMyInfo | undefined;
}

export interface State extends AsyncState {
  authenticated: AuthProps;
}

export interface CredentialsProp {
  email: string;
  password: string;
}

export interface ChangePassProp {
  newPassword: string;
  firebaseUid: string;
  isNewUser: boolean;
}

export interface ChangePassResponse {
  uid: string;
  email: string;
  userType: UserType;
}

export enum Actions {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  GETME_PENDING = 'GETME_PENDING',
  GETME_SUCCESS = 'GETME_SUCCESS',
  GETME_ERROR = 'GETME_ERROR',
  SET_AUTHENTICATION = 'SET_AUTHENTICATION',
  LOGOUT_PENDING = 'LOGOUT_PENDING',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_ERROR = 'LOGOUT_ERROR',
  NEW_PASS_PENDING = 'NEW_PASS_PENDING',
  NEW_PASS_SUCCESS = 'NEW_PASS_SUCCESS',
  NEW_PASS_ERROR = 'NEW_PASS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
