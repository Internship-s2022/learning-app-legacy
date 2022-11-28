import { ActionType } from 'typesafe-actions';

import { CourseUser } from 'src/interfaces/entities/course-user';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  courseUser: CourseUser;
  courseUsers: CourseUser[];
  filterQuery: string;
}

export enum Actions {
  GET_USERS_BY_COURSE_ID_FETCHING = 'GET_USERS_BY_COURSE_ID_FETCHING',
  GET_USERS_BY_COURSE_ID_SUCCESS = 'GET_USERS_BY_COURSE_ID_SUCCESS',
  GET_USERS_BY_COURSE_ID_ERROR = 'GET_USERS_BY_COURSE_ID_ERROR',
  DISABLE_BY_USER_ID_FETCHING = 'DISABLE_BY_USER_ID_FETCHING',
  DISABLE_BY_USER_ID_SUCCESS = 'DISABLE_BY_USER_ID_SUCCESS',
  DISABLE_BY_USER_ID_ERROR = 'DISABLE_BY_USER_ID_ERROR',
  SET_COURSES_QUERY = 'SET_COURSES_QUERY',
  RESET_COURSES_QUERY = 'RESET_COURSES_QUERY',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
