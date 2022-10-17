import { action, createAsyncAction } from 'typesafe-actions';

import { Actions, AuthProps } from './types';

export const login = createAsyncAction(
  Actions.LOGIN_PENDING,
  Actions.LOGIN_SUCCESS,
  Actions.LOGIN_ERROR,
)<string, AuthProps, string>();

export const setAuthentication = (data: AuthProps) => action(Actions.SET_AUTHENTICATION, data);

export const logout = createAsyncAction(
  Actions.LOGOUT_PENDING,
  Actions.LOGOUT_SUCCESS,
  Actions.LOGOUT_ERROR,
)<string, unknown, string>();
