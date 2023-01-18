import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { PostulantCourse } from 'src/interfaces/entities/postulant-course';

import { NoParamForAction } from '../types';
import { Actions, PromotionResponse } from './types';

export const setQuery = (data: string) => action(Actions.SET_POSTULANT_COURSE_QUERY, data);
export const resetQuery = () => action(Actions.RESET_POSTULANT_COURSE_QUERY);

export const getCorrectedPostulantsByCourseId = createAsyncAction(
  Actions.GET_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING,
  Actions.GET_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS,
  Actions.GET_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR,
)<NoParamForAction, { data: PostulantCourse[]; pagination: Pagination }, ErrorResponse>();

export const getNotCorrectedPostulantsByCourseId = createAsyncAction(
  Actions.GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_FETCHING,
  Actions.GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_SUCCESS,
  Actions.GET_NOT_CORRECTED_POSTULANTS_BY_COURSE_ID_ERROR,
)<NoParamForAction, { data: PostulantCourse[]; pagination: Pagination }, ErrorResponse>();

export const promotePostulants = createAsyncAction(
  Actions.PROMOTE_POSTULANTS_FETCHING,
  Actions.PROMOTE_POSTULANTS_SUCCESS,
  Actions.PROMOTE_POSTULANTS_ERROR,
)<NoParamForAction, { data: PromotionResponse }, ErrorResponse>();

export const correctTests = createAsyncAction(
  Actions.CORRECT_TESTS_FETCHING,
  Actions.CORRECT_TESTS_SUCCESS,
  Actions.CORRECT_TESTS_ERROR,
)<NoParamForAction, { data: PostulantCourse[] }, ErrorResponse>();
