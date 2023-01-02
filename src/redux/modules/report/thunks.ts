import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import {
  editReportByIdRequest,
  getReportsByCourseIdRequest,
  getReportsByModuleIdRequest,
} from './api';

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

export const getReportsByModuleId = (id: string, moduleId: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getReportsByModuleId.request(''));
    try {
      const response = await getReportsByModuleIdRequest({ id, query }, moduleId);
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.getReportsByModuleId.success({
          data: response.data,
          pagination: response.pagination,
        }),
      );
    } catch (error) {
      return dispatch(actions.getReportsByModuleId.failure(error));
    }
  };
};

export const editReportById = (id: string, moduleId: string, data) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.editReportById.request(''));
    try {
      const response = await editReportByIdRequest({ id, data });
      const reportState = getState().report;
      if (response.error) {
        throw response;
      }
      await dispatch(
        getReportsByModuleId(
          id,
          moduleId,
          `&page=${reportState.pagination.page}&limit=${reportState.pagination.limit}${
            reportState.filterQuery.length ? reportState.filterQuery : null
          }`,
        ),
      );
      return dispatch(actions.editReportById.success({ data: response.data }));
    } catch (error) {
      return dispatch(actions.editReportById.failure(error));
    }
  };
};
