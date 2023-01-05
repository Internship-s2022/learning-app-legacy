import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import * as api from './api';
import { PostulationType } from './types';

export const getPublicCourses = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getPublicCourses.request(''));
    try {
      const response = await api.getPublicCourses({ query });
      if (response.data?.length) {
        return dispatch(
          actions.getPublicCourses.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.getPublicCourses.failure(error));
    }
  };
};

export const getPublicRegistrationForm = (courseId: string, viewId: string, query = '') => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getPublicRegistrationForm.request(''));
    try {
      const response = await api.getPublicRegistrationForm({ courseId, viewId, query });
      if (response.data.questions.length) {
        return dispatch(
          actions.getPublicRegistrationForm.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.getPublicRegistrationForm.failure(error));
    }
  };
};

export const createPostulation = (courseId: string, data: PostulationType) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createPostulation.request(''));
    try {
      const response = await api.createPostulation({ courseId: courseId, data: data });
      if (response.data) {
        return dispatch(
          actions.createPostulation.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.createPostulation.failure(error));
    }
  };
};
