import { action, createAsyncAction } from 'typesafe-actions';

import { Actions, AuthProps } from './types';

export const login = createAsyncAction(
  Actions.LOGIN_PENDING,
  Actions.LOGIN_SUCCESS,
  Actions.LOGIN_ERROR,
)<string, AuthProps, string>();

export const logout = () => action(Actions.LOGOUT);
