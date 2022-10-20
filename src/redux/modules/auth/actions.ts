import { action, createAsyncAction } from 'typesafe-actions';

import { ErrorResponse } from 'src/interfaces/api';

import { Actions, AuthProps } from './types';

export const login = createAsyncAction(
  Actions.LOGIN_PENDING,
  Actions.LOGIN_SUCCESS,
  Actions.LOGIN_ERROR,
)<string, AuthProps, ErrorResponse>();

export const setAuthentication = (data: AuthProps) => action(Actions.SET_AUTHENTICATION, data);

export const logout = createAsyncAction(
  Actions.LOGOUT_PENDING,
  Actions.LOGOUT_SUCCESS,
  Actions.LOGOUT_ERROR,
)<string, unknown, ErrorResponse>();

export const newPass = createAsyncAction(
  Actions.NEW_PASS_PENDING,
  Actions.NEW_PASS_SUCCESS,
  Actions.NEW_PASS_ERROR,
)<string, unknown, string>();
