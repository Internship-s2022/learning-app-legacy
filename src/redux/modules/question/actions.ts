import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { QuestionType } from 'src/interfaces/entities/question';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setQuestion = (data: QuestionType) => action(Actions.SET_QUESTION, data);

export const setQuery = (data: string) => action(Actions.SET_QUESTIONS_QUERY, data);
export const resetQuery = () => action(Actions.RESET_QUESTIONS_QUERY);

export const getQuestions = createAsyncAction(
  Actions.GET_QUESTIONS_FETCHING,
  Actions.GET_QUESTIONS_SUCCESS,
  Actions.GET_QUESTIONS_ERROR,
)<NoParamForAction, { data: QuestionType[]; pagination: Pagination }, ErrorResponse>();

export const getQuestionById = createAsyncAction(
  Actions.GET_QUESTION_BY_ID_FETCHING,
  Actions.GET_QUESTION_BY_ID_SUCCESS,
  Actions.GET_QUESTION_BY_ID_ERROR,
)<NoParamForAction, { data: QuestionType }, ErrorResponse>();

export const editQuestion = createAsyncAction(
  Actions.EDIT_QUESTION_FETCHING,
  Actions.EDIT_QUESTION_SUCCESS,
  Actions.EDIT_QUESTION_ERROR,
)<NoParamForAction, { data: QuestionType }, ErrorResponse>();

export const createQuestion = createAsyncAction(
  Actions.CREATE_QUESTION_FETCHING,
  Actions.CREATE_QUESTION_SUCCESS,
  Actions.CREATE_QUESTION_ERROR,
)<NoParamForAction, { data: QuestionType[] }, ErrorResponse>();
