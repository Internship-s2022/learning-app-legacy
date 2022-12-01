import { ActionType } from 'typesafe-actions';

<<<<<<< HEAD
import { RegistrationFormType } from 'src/interfaces/entities/registration-form';
=======
import { RegistrationForm } from 'src/interfaces/entities/registration-form';
>>>>>>> b2b6323 (RL-114: Added registration form redux config)

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
<<<<<<< HEAD
  registrationForms: RegistrationFormType[];
  registrationForm: RegistrationFormType;
  filterQuery: string;
=======
  registrationForms: RegistrationForm[];
>>>>>>> b2b6323 (RL-114: Added registration form redux config)
}

export enum Actions {
  GET_REGISTRATION_FORM_FETCHING = 'GET_REGISTRATION_FORM_FETCHING',
  GET_REGISTRATION_FORM_SUCCESS = 'GET_REGISTRATION_FORM_SUCCESS',
  GET_REGISTRATION_FORM_ERROR = 'GET_REGISTRATION_FORM_ERROR',
<<<<<<< HEAD
  GET_REGISTRATION_FORM_BY_COURSE_ID_FETCHING = 'GET_BY_COURSE_ID_REGISTRATION_FORM_FETCHING',
  GET_REGISTRATION_FORM_BY_COURSE_ID_SUCCESS = 'GET_BY_COURSE_ID_REGISTRATION_FORM_SUCCESS',
  GET_REGISTRATION_FORM_BY_COURSE_ID_ERROR = 'GET_BY_COURSE_ID_REGISTRATION_FORM_ERROR',
=======
>>>>>>> b2b6323 (RL-114: Added registration form redux config)
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
