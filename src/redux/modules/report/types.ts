import { ActionType } from 'typesafe-actions';

import { Report } from 'src/interfaces/entities/report';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  reportsByCourse: Report[];
  reportsByModule: Report[];
  filterQuery: string;
}

export enum Actions {
  GET_REPORTS_BY_MODULE_ID_FETCHING = 'GET_REPORT_BY_MODULE_ID_FETCHING',
  GET_REPORTS_BY_MODULE_ID_SUCCESS = 'GET_REPORT_BY_MODULE_ID_SUCCESS',
  GET_REPORTS_BY_MODULE_ID_ERROR = 'GET_REPORT_BY_MODULE_ID_ERROR',
  GET_REPORTS_BY_COURSE_ID_FETCHING = 'GET_REPORT_BY_COURSE_ID_FETCHING',
  GET_REPORTS_BY_COURSE_ID_SUCCESS = 'GET_REPORT_BY_COURSE_ID_SUCCESS',
  GET_REPORTS_BY_COURSE_ID_ERROR = 'GET_REPORT_BY_COURSE_ID_ERROR',
  EDIT_REPORT_FETCHING = 'EDIT_REPORT_FETCHING',
  EDIT_REPORT_SUCCESS = 'EDIT_REPORT_SUCCESS',
  EDIT_REPORT_ERROR = 'EDIT_REPORT_ERROR',
  SET_REPORT_QUERY = 'SET_REPORT_QUERY',
  RESET_REPORT_QUERY = 'RESET_REPORT_QUERY',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
