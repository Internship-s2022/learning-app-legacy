import { ActionType } from 'typesafe-actions';

import { QuestionType } from 'src/interfaces/entities/question';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  question: QuestionType | undefined;
  questions: QuestionType[];
  filterQuery: string;
}

export enum Actions {
  SET_QUESTION = 'SET_QUESTION',
  GET_QUESTIONS_FETCHING = 'GET_QUESTIONS_FETCHING',
  GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS',
  GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR',
  GET_QUESTION_BY_ID_FETCHING = 'GET_QUESTION_BY_ID_FETCHING',
  GET_QUESTION_BY_ID_SUCCESS = 'GET_QUESTION_BY_ID_SUCCESS',
  GET_QUESTION_BY_ID_ERROR = 'GET_QUESTION_BY_ID_ERROR',
  SET_QUESTIONS_QUERY = 'SET_QUESTIONS_QUERY',
  RESET_QUESTIONS_QUERY = 'RESET_QUESTIONS_QUERY',
  EDIT_QUESTION_FETCHING = 'EDIT_QUESTION_FETCHING',
  EDIT_QUESTION_SUCCESS = 'EDIT_QUESTION_SUCCESS',
  EDIT_QUESTION_ERROR = 'EDIT_QUESTION_ERROR',
  CREATE_QUESTION_FETCHING = 'CREATE_QUESTION_FETCHING',
  CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS',
  CREATE_QUESTION_ERROR = 'CREATE_QUESTION_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
