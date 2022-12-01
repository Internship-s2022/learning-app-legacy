import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { correctTestsRequest, getPostulantsInCourseRequest, promotePostulantsRequest } from './api';

export const getPostulantsByCourseId = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getPostulantsByCourseId.request(''));
    try {
      const response = await getPostulantsInCourseRequest({ id, query });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.getPostulantsByCourseId.success({
          data: response.data,
          pagination: response.pagination,
        }),
      );
    } catch (error) {
      return dispatch(actions.getPostulantsByCourseId.failure(error));
    }
  };
};

export const promotePostulants = (id: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.promotePostulants.request(''));
    try {
      const response = await promotePostulantsRequest({ id });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.promotePostulants.success({
          data: response.data,
        }),
      );
    } catch (error) {
      return dispatch(actions.promotePostulants.failure(error));
    }
  };
};

export const correctTests = (id: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.correctTests.request(''));
    try {
      const response = await correctTestsRequest({ id });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.correctTests.success({
          data: response.data,
        }),
      );
    } catch (error) {
      return dispatch(actions.correctTests.failure(error));
    }
  };
};
