import { action, createAsyncAction } from 'typesafe-actions';

import { ErrorResponse } from 'src/interfaces/api';
import { Course } from 'src/interfaces/entities/course';

import { NoParamForAction } from '../types';
import { Actions, PostulationType, PublicRegistrationFormType } from './types';

export const clearError = () => action(Actions.CLEAR_ERROR);

export const getPublicCourses = createAsyncAction(
  Actions.GET_PUBLIC_COURSES_FETCHING,
  Actions.GET_PUBLIC_COURSES_SUCCESS,
  Actions.GET_PUBLIC_COURSES_ERROR,
)<NoParamForAction, { data: Course[] }, ErrorResponse>();

export const getPublicRegistrationForm = createAsyncAction(
  Actions.GET_PUBLIC_REGISTRATION_FORM_FETCHING,
  Actions.GET_PUBLIC_REGISTRATION_FORM_SUCCESS,
  Actions.GET_PUBLIC_REGISTRATION_FORM_ERROR,
)<NoParamForAction, { data: PublicRegistrationFormType }, ErrorResponse>();

export const createPostulation = createAsyncAction(
  Actions.CREATE_POSTULATION_FETCHING,
  Actions.CREATE_POSTULATION_SUCCESS,
  Actions.CREATE_POSTULATION_ERROR,
)<NoParamForAction, { data: PostulationType }, ErrorResponse>();
