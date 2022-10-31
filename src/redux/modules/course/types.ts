import { ActionType } from 'typesafe-actions';

import { GeneralDataType } from 'src/interfaces';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface Course {
  _id: string;
  name: string;
  admissionTests: AdmissionTest[];
  description: string;
  inscriptionStartDate: string;
  inscriptionEndDate: string;
  startDate: string;
  endDate: string;
  type: string;
  isInternal: boolean;
  isActive: boolean;
}

export interface AdmissionTest {
  _id: string;
  name: string;
  isActive: boolean;
}

export interface Postulant extends GeneralDataType {
  firstName: string;
  lastName: string;
  birthDate: string;
  location: string;
  dni: string;
  email: string;
  phone: string;
  isActive: boolean;
}

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
  CREATE_MANUAL_COURSE_FETCHING = 'CREATE_MANUAL_COURSE_FETCHING',
  CREATE_MANUAL_COURSE_SUCCESS = 'CREATE_MANUAL_COURSE_SUCCESS',
  CREATE_MANUAL_COURSE_ERROR = 'CREATE_MANUAL_COURSE_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
