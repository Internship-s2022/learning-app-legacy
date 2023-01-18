import { ActionType } from 'typesafe-actions';

import { QuestionType } from 'src/interfaces/entities/question';

import { AsyncState, Params } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  question: QuestionType | undefined;
  questions: QuestionType[];
  filterQuery: string;
}

export enum Actions {
  RESET_QUESTIONS = 'RESET_QUESTIONS',
  SET_QUESTION = 'SET_QUESTION',
  GET_QUESTIONS_FETCHING = 'GET_QUESTIONS_FETCHING',
  GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS',
  GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR',
  SET_QUESTIONS_QUERY = 'SET_QUESTIONS_QUERY',
  RESET_QUESTIONS_QUERY = 'RESET_QUESTIONS_QUERY',
  EDIT_QUESTIONS_FETCHING = 'EDIT_QUESTIONS_FETCHING',
  EDIT_QUESTIONS_SUCCESS = 'EDIT_QUESTIONS_SUCCESS',
  EDIT_QUESTIONS_ERROR = 'EDIT_QUESTIONS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;

export interface QuestionParams extends Params<QuestionType[]> {
  regFormId?: string;
  viewId?: string;
}
