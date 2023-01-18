import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { QuestionType } from 'src/interfaces/entities/question';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setQuestion = (data: QuestionType) => action(Actions.SET_QUESTION, data);
export const resetQuestions = () => action(Actions.RESET_QUESTIONS);

export const setQuery = (data: string) => action(Actions.SET_QUESTIONS_QUERY, data);
export const resetQuery = () => action(Actions.RESET_QUESTIONS_QUERY);

export const getQuestions = createAsyncAction(
  Actions.GET_QUESTIONS_FETCHING,
  Actions.GET_QUESTIONS_SUCCESS,
  Actions.GET_QUESTIONS_ERROR,
)<NoParamForAction, { data: QuestionType[]; pagination: Pagination }, ErrorResponse>();

export const editQuestions = createAsyncAction(
  Actions.EDIT_QUESTIONS_FETCHING,
  Actions.EDIT_QUESTIONS_SUCCESS,
  Actions.EDIT_QUESTIONS_ERROR,
)<NoParamForAction, { data: QuestionType[] }, ErrorResponse>();
