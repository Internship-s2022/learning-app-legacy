import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { QuestionType } from 'src/interfaces/entities/question';

import { RootReducer } from '../types';
import * as actions from './actions';
import {
  createQuestionsRequest,
  editQuestionRequest,
  getQuestionByIdRequest,
  getQuestionsRequest,
} from './api';

export const getQuestions = (regFormId: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getQuestions.request(''));
    try {
      const response = await getQuestionsRequest({ query, regFormId });
      if (response.data?.length) {
        return dispatch(
          actions.getQuestions.success({ data: response.data, pagination: response.pagination }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getQuestions.failure(error));
    }
  };
};

export const getQuestionById = (id: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getQuestionById.request(''));
    try {
      const response = await getQuestionByIdRequest({ id });
      if (response.error) {
        throw response;
      }
      return dispatch(actions.getQuestionById.success({ data: response.data }));
    } catch (error) {
      return dispatch(actions.getQuestionById.failure(error));
    }
  };
};

export const createQuestions = (data: QuestionType[]) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createQuestion.request(''));
    try {
      const response = await createQuestionsRequest({ data });
      if (response.data?.length) {
        return dispatch(actions.createQuestion.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.createQuestion.failure(error));
    }
  };
};

export const editQuestion = (id: QuestionType['_id'], data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editQuestion.request(''));
    try {
      const response = await editQuestionRequest({ id, data });
      if (response.data?._id) {
        return dispatch(actions.editQuestion.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editQuestion.failure(error));
    }
  };
};
