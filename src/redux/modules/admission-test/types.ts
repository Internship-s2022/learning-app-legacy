import { ActionType } from 'typesafe-actions';

import { AdmissionTest } from 'src/interfaces/entities/admission-test';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  admissionTest: AdmissionTest | undefined;
  admissionTests: AdmissionTest[];
  filterQuery: string;
}

export enum Actions {
  SET_ADMISSION_TEST = 'SET_ADMISSION_TEST',
  GET_ADMISSION_TESTS_FETCHING = 'GET_ADMISSION_TESTS_FETCHING',
  GET_ADMISSION_TESTS_SUCCESS = 'GET_ADMISSION_TESTS_SUCCESS',
  GET_ADMISSION_TESTS_ERROR = 'GET_ADMISSION_TESTS_ERROR',
  DELETE_ADMISSION_TESTS_FETCHING = 'DELETE_ADMISSION_TESTS_FETCHING',
  DELETE_ADMISSION_TESTS_SUCCESS = 'DELETE_ADMISSION_TESTS_SUCCESS',
  DELETE_ADMISSION_TESTS_ERROR = 'DELETE_ADMISSION_TESTS_ERROR',
  SET_QUERY = 'SET_QUERY',
  RESET_QUERY = 'RESET_QUERY',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
