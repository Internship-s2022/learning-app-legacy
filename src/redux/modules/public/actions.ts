import { createAsyncAction } from 'typesafe-actions';

import { ErrorResponse } from 'src/interfaces/api';
import { Course } from 'src/interfaces/entities/course';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const getPublicCourses = createAsyncAction(
  Actions.GET_PUBLIC_COURSES_FETCHING,
  Actions.GET_PUBLIC_COURSES_SUCCESS,
  Actions.GET_PUBLIC_COURSES_ERROR,
)<NoParamForAction, { data: Course[] }, ErrorResponse>();
