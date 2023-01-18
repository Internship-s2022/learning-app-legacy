import { action, createAsyncAction } from 'typesafe-actions';

import { ErrorResponse } from 'src/interfaces/api';
import { StudentGroupHistory } from 'src/interfaces/entities/group';
import { StudentReport } from 'src/interfaces/entities/report';

import { NoParamForAction } from '../types';
import { Actions, AuthProps, GetMeInfo } from './types';

export const login = createAsyncAction(
  Actions.LOGIN_FETCHING,
  Actions.LOGIN_SUCCESS,
  Actions.LOGIN_ERROR,
)<NoParamForAction, AuthProps, ErrorResponse>();

export const getMe = createAsyncAction(
  Actions.GET_ME_FETCHING,
  Actions.GET_ME_SUCCESS,
  Actions.GET_ME_ERROR,
)<NoParamForAction, GetMeInfo, ErrorResponse>();

export const setAuthentication = (data: AuthProps) => action(Actions.SET_AUTHENTICATION, data);

export const logout = createAsyncAction(
  Actions.LOGOUT_FETCHING,
  Actions.LOGOUT_SUCCESS,
  Actions.LOGOUT_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();

export const newPass = createAsyncAction(
  Actions.NEW_PASS_FETCHING,
  Actions.NEW_PASS_SUCCESS,
  Actions.NEW_PASS_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();

export const getStudentReports = createAsyncAction(
  Actions.GET_STUDENT_REPORTS_FETCHING,
  Actions.GET_STUDENT_REPORTS_SUCCESS,
  Actions.GET_STUDENT_REPORTS_ERROR,
)<NoParamForAction, StudentReport[], ErrorResponse>();

export const getStudentGroupHistory = createAsyncAction(
  Actions.GET_STUDENT_HISTORY_FETCHING,
  Actions.GET_STUDENT_HISTORY_SUCCESS,
  Actions.GET_STUDENT_HISTORY_ERROR,
)<NoParamForAction, StudentGroupHistory[], ErrorResponse>();

export const clearStudentFlow = () => action(Actions.CLEAR_STUDENT_FLOW);
