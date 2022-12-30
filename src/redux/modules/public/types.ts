import { ActionType } from 'typesafe-actions';

import { Course } from 'src/interfaces/entities/course';
import { RegistrationFormType } from 'src/interfaces/entities/registration-form';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  course: Course;
  courses: Course[];
  registrationForm: RegistrationFormType;
}

export enum Actions {
  GET_PUBLIC_COURSES_FETCHING = 'GET_PUBLIC_COURSES_FETCHING',
  GET_PUBLIC_COURSES_SUCCESS = 'GET_PUBLIC_COURSES_SUCCESS',
  GET_PUBLIC_COURSES_ERROR = 'GET_PUBLIC_COURSES_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
