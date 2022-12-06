import { createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { RegistrationFormType } from 'src/interfaces/entities/registration-form';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const getRegistrationForms = createAsyncAction(
  Actions.GET_REGISTRATION_FORM_FETCHING,
  Actions.GET_REGISTRATION_FORM_SUCCESS,
  Actions.GET_REGISTRATION_FORM_ERROR,
)<NoParamForAction, { data: RegistrationFormType[]; pagination: Pagination }, ErrorResponse>();

export const getRegistrationFormByCourseId = createAsyncAction(
  Actions.GET_REGISTRATION_FORM_BY_COURSE_ID_FETCHING,
  Actions.GET_REGISTRATION_FORM_BY_COURSE_ID_SUCCESS,
  Actions.GET_REGISTRATION_FORM_BY_COURSE_ID_ERROR,
)<NoParamForAction, RegistrationFormType, ErrorResponse>();
