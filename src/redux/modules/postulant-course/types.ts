import { ActionType } from 'typesafe-actions';

import { PostulantCourse } from 'src/interfaces/entities/postulant-course';
import { User } from 'src/interfaces/entities/user';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  correctedPostulantCourses: PostulantCourse[];
  notCorrectedPostulantCourses: PostulantCourse[];
  filterQuery: string;
}

interface FailedType {
  postulantId: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

interface SuccessfulType {
  postulantId: string | undefined;
  user: User;
}

export interface PromotionResponse {
  failedPostulants: FailedType[];
  successfulPostulants: SuccessfulType[];
}

export enum Actions {
  SET_POSTULANT_COURSE_QUERY = 'SET_POSTULANT_COURSE_QUERY',
  RESET_POSTULANT_COURSE_QUERY = 'RESET_POSTULANT_COURSE_QUERY',
  GET_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING = 'GET_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING',
  GET_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS = 'GET_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS',
  GET_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR = 'GET_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR',
  GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING = 'GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING',
  GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS = 'GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS',
  GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR = 'GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR',
  PROMOTE_POSTULANTS_FETCHING = 'PROMOTE_POSTULANTS_FETCHING',
  PROMOTE_POSTULANTS_SUCCESS = 'PROMOTE_POSTULANTS_SUCCESS',
  PROMOTE_POSTULANTS_ERROR = 'PROMOTE_POSTULANTS_ERROR',
  CORRECT_TESTS_FETCHING = 'CORRECT_TESTS_FETCHING',
  CORRECT_TESTS_SUCCESS = 'CORRECT_TESTS_SUCCESS',
  CORRECT_TESTS_ERROR = 'CORRECT_TESTS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
