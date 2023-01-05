import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { Report } from 'src/interfaces/entities/report';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setQuery = (data: string) => action(Actions.SET_REPORT_QUERY, data);
export const resetQuery = () => action(Actions.RESET_REPORT_QUERY);

export const getReportsByCourseId = createAsyncAction(
  Actions.GET_REPORTS_BY_COURSE_ID_FETCHING,
  Actions.GET_REPORTS_BY_COURSE_ID_SUCCESS,
  Actions.GET_REPORTS_BY_COURSE_ID_ERROR,
)<NoParamForAction, { data: Report[]; pagination: Pagination }, ErrorResponse>();

export const getReportsByModuleId = createAsyncAction(
  Actions.GET_REPORTS_BY_MODULE_ID_FETCHING,
  Actions.GET_REPORTS_BY_MODULE_ID_SUCCESS,
  Actions.GET_REPORTS_BY_MODULE_ID_ERROR,
)<NoParamForAction, { data: Report[]; pagination: Pagination }, ErrorResponse>();

export const editReportById = createAsyncAction(
  Actions.EDIT_REPORT_FETCHING,
  Actions.EDIT_REPORT_SUCCESS,
  Actions.EDIT_REPORT_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();
