import { ActionType } from 'typesafe-actions';

import { Course } from 'src/interfaces/entities';

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
  DELETE_COURSES_FETCHING = 'DELETE_COURSES_FETCHING',
  DELETE_COURSES_SUCCESS = 'DELETE_COURSES_SUCCESS',
  DELETE_COURSES_ERROR = 'DELETE_COURSES_ERROR',
  SET_QUERY = 'SET_QUERY',
  RESET_QUERY = 'RESET_QUERY',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
