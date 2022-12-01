import { ActionType } from 'typesafe-actions';

import { Course } from 'src/interfaces/entities/course';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  course: Course | undefined;
  courses: Course[];
  filterQuery: string;
}

export enum Actions {
  SET_COURSE = 'SET_COURSE',
  GET_COURSES_FETCHING = 'GET_COURSES_FETCHING',
  GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS',
  GET_COURSES_ERROR = 'GET_COURSES_ERROR',
  GET_COURSE_BY_ID_FETCHING = 'GET_COURSE_BY_ID_FETCHING',
  GET_COURSE_BY_ID_SUCCESS = 'GET_COURSE_BY_ID_SUCCESS',
  GET_COURSE_BY_ID_ERROR = 'GET_COURSE_BY_ID_ERROR',
  DELETE_COURSE_FETCHING = 'DELETE_COURSE_FETCHING',
  DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS',
  DELETE_COURSE_ERROR = 'DELETE_COURSE_ERROR',
  SET_COURSES_QUERY = 'SET_COURSES_QUERY',
  RESET_COURSES_QUERY = 'RESET_COURSES_QUERY',
  EDIT_COURSE_FETCHING = 'EDIT_COURSE_FETCHING',
  EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS',
  EDIT_COURSE_ERROR = 'EDIT_COURSE_ERROR',
  CREATE_COURSE_FETCHING = 'CREATE_COURSE_FETCHING',
  CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS',
  CREATE_COURSE_ERROR = 'CREATE_COURSE_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
