import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { Course } from 'src/interfaces/entities/course';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setCourse = (data: Course) => action(Actions.SET_COURSE, data);

export const setQuery = (data: string) => action(Actions.SET_QUERY, data);
export const resetQuery = () => action(Actions.RESET_QUERY);

export const getCourses = createAsyncAction(
  Actions.GET_COURSES_FETCHING,
  Actions.GET_COURSES_SUCCESS,
  Actions.GET_COURSES_ERROR,
)<NoParamForAction, { data: Course[]; pagination: Pagination }, ErrorResponse>();

export const deleteCourse = createAsyncAction(
  Actions.DELETE_COURSES_FETCHING,
  Actions.DELETE_COURSES_SUCCESS,
  Actions.DELETE_COURSES_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();

export const editCourse = createAsyncAction(
  Actions.EDIT_COURSE_FETCHING,
  Actions.EDIT_COURSE_SUCCESS,
  Actions.EDIT_COURSE_ERROR,
)<NoParamForAction, { data: Course }, unknown>();

export const createCourse = createAsyncAction(
  Actions.CREATE_COURSE_FETCHING,
  Actions.CREATE_COURSE_SUCCESS,
  Actions.CREATE_COURSE_ERROR,
)<NoParamForAction, { data: Course }, unknown>();
