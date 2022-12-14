import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { getReportsByCourseIdRequest } from './api';

export const getReportsByCourseId = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getReportsByCourseId.request(''));
    try {
      const response = await getReportsByCourseIdRequest({ id, query });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.getReportsByCourseId.success({
          data: response.data,
          pagination: response.pagination,
        }),
      );
    } catch (error) {
      return dispatch(actions.getReportsByCourseId.failure(error));
    }
  };
};
