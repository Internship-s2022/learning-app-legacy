import { action, createAsyncAction } from 'typesafe-actions';

import { ErrorResponse } from 'src/interfaces/api';

import { NoParamForAction } from '../types';
import { Actions, AuthProps } from './types';

export const login = createAsyncAction(
  Actions.LOGIN_PENDING,
  Actions.LOGIN_SUCCESS,
  Actions.LOGIN_ERROR,
)<NoParamForAction, AuthProps, ErrorResponse>();

export const getMe = createAsyncAction(
  Actions.GETME_PENDING,
  Actions.GETME_SUCCESS,
  Actions.GETME_ERROR,
)<NoParamForAction, AuthProps, ErrorResponse>();

export const setAuthentication = (data: AuthProps) => action(Actions.SET_AUTHENTICATION, data);

export const logout = createAsyncAction(
  Actions.LOGOUT_PENDING,
  Actions.LOGOUT_SUCCESS,
  Actions.LOGOUT_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();

export const newPass = createAsyncAction(
  Actions.NEW_PASS_PENDING,
  Actions.NEW_PASS_SUCCESS,
  Actions.NEW_PASS_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();
