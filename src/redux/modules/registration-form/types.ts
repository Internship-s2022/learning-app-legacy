import { ActionType } from 'typesafe-actions';

import { RegistrationFormType } from 'src/interfaces/entities/registration-form';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  registrationForms: RegistrationFormType[];
  registrationForm: RegistrationFormType;
  filterQuery: string;
}

export enum Actions {
  GET_REGISTRATION_FORM_FETCHING = 'GET_REGISTRATION_FORM_FETCHING',
  GET_REGISTRATION_FORM_SUCCESS = 'GET_REGISTRATION_FORM_SUCCESS',
  GET_REGISTRATION_FORM_ERROR = 'GET_REGISTRATION_FORM_ERROR',
  DELETE_REGISTRATION_FORM_FETCHING = 'DELETE_REGISTRATION_FORM_FETCHING',
  DELETE_REGISTRATION_FORM_SUCCESS = 'DELETE_REGISTRATION_FORM_SUCCESS',
  DELETE_REGISTRATION_FORM_ERROR = 'DELETE_REGISTRATION_FORM_ERROR',
  GET_REGISTRATION_FORM_BY_COURSE_ID_FETCHING = 'GET_BY_COURSE_ID_REGISTRATION_FORM_FETCHING',
  GET_REGISTRATION_FORM_BY_COURSE_ID_SUCCESS = 'GET_BY_COURSE_ID_REGISTRATION_FORM_SUCCESS',
  GET_REGISTRATION_FORM_BY_COURSE_ID_ERROR = 'GET_BY_COURSE_ID_REGISTRATION_FORM_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
