import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { QuestionType } from 'src/interfaces/entities/question';

import { RootReducer } from '../types';
import * as actions from './actions';
import { editQuestionsRequest, getQuestionsRequest } from './api';

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

export const editQuestions = (
  regFormId: QuestionType['registrationForm'],
  viewId: QuestionType['view'],
  data: QuestionType[],
) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editQuestions.request(''));
    try {
      const response = await editQuestionsRequest({ regFormId, viewId, data });
      if (response.data.length) {
        return dispatch(actions.editQuestions.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editQuestions.failure(error));
    }
  };
};
