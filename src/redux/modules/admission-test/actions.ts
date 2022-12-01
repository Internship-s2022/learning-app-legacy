import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { AdmissionTest } from 'src/interfaces/entities/admission-test';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setAdmissionTest = (data: AdmissionTest) => action(Actions.SET_ADMISSION_TEST, data);

export const setQuery = (data: string) => action(Actions.SET_ADMISSION_TESTS_QUERY, data);
export const resetQuery = () => action(Actions.RESET_ADMISSION_TESTS_QUERY);

export const getAdmissionTests = createAsyncAction(
  Actions.GET_ADMISSION_TESTS_FETCHING,
  Actions.GET_ADMISSION_TESTS_SUCCESS,
  Actions.GET_ADMISSION_TESTS_ERROR,
)<NoParamForAction, { data: AdmissionTest[]; pagination: Pagination }, ErrorResponse>();

export const deleteAdmissionTest = createAsyncAction(
  Actions.DELETE_ADMISSION_TESTS_FETCHING,
  Actions.DELETE_ADMISSION_TESTS_SUCCESS,
  Actions.DELETE_ADMISSION_TESTS_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();

export const editAdmissionTest = createAsyncAction(
  Actions.PUT_ADMISSION_TESTS_FETCHING,
  Actions.PUT_ADMISSION_TESTS_SUCCESS,
  Actions.PUT_ADMISSION_TESTS_ERROR,
)<NoParamForAction, { data: AdmissionTest }, ErrorResponse>();

export const createAdmissionTest = createAsyncAction(
  Actions.CREATE_ADMISSION_TESTS_FETCHING,
  Actions.CREATE_ADMISSION_TESTS_SUCCESS,
  Actions.CREATE_ADMISSION_TESTS_ERROR,
)<NoParamForAction, { data: AdmissionTest }, ErrorResponse>();
