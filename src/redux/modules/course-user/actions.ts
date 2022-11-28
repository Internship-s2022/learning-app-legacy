import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { CourseUser } from 'src/interfaces/entities/course-user';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setQuery = (data: string) => action(Actions.SET_COURSES_QUERY, data);
export const resetQuery = () => action(Actions.RESET_COURSES_QUERY);

export const getUsersByCourseId = createAsyncAction(
  Actions.GET_USERS_BY_COURSE_ID_FETCHING,
  Actions.GET_USERS_BY_COURSE_ID_SUCCESS,
  Actions.GET_USERS_BY_COURSE_ID_ERROR,
)<NoParamForAction, { data: CourseUser[]; pagination: Pagination }, ErrorResponse>();

export const disableByUserId = createAsyncAction(
  Actions.DISABLE_BY_USER_ID_FETCHING,
  Actions.DISABLE_BY_USER_ID_SUCCESS,
  Actions.DISABLE_BY_USER_ID_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();
