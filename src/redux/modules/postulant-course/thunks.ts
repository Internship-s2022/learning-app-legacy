import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import {
  correctTestsRequest,
  getCorrectedPostulantsRequest,
  getNotCorrectedPostulantsRequest,
  promotePostulantsRequest,
} from './api';

export const getCorrectedPostulants = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getCorrectedPostulantsByCourseId.request(''));
    try {
      const response = await getCorrectedPostulantsRequest({ id, query });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.getCorrectedPostulantsByCourseId.success({
          data: response.data,
          pagination: response.pagination,
        }),
      );
    } catch (error) {
      return dispatch(actions.getCorrectedPostulantsByCourseId.failure(error));
    }
  };
};

export const getNotCorrectedPostulants = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getNotCorrectedPostulantsByCourseId.request(''));
    try {
      const response = await getNotCorrectedPostulantsRequest({ id, query });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.getNotCorrectedPostulantsByCourseId.success({
          data: response.data,
          pagination: response.pagination,
        }),
      );
    } catch (error) {
      return dispatch(actions.getNotCorrectedPostulantsByCourseId.failure(error));
    }
  };
};

export const promotePostulants = (id: string, data) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.promotePostulants.request(''));
    try {
      const response = await promotePostulantsRequest({ id, data });
      if (response.error) {
        throw response;
      }
      const postulantCourseState = getState().postulantCourse;
      await dispatch(
        getCorrectedPostulants(
          id,
          `&page=${postulantCourseState.pagination.page}&limit=${
            postulantCourseState.pagination.limit
          }${postulantCourseState.filterQuery.length ? postulantCourseState.filterQuery : null}`,
        ),
      );
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

export const correctTests = (id: string, query: string, data, getCorrected = false) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.correctTests.request(''));
    try {
      const response = await correctTestsRequest({ id, query, data });
      if (response.error) {
        throw response;
      }
      const postulantCourseState = getState().postulantCourse;
      getCorrected
        ? await dispatch(
            getCorrectedPostulants(
              id,
              `&page=${postulantCourseState.pagination.page}&limit=${
                postulantCourseState.pagination.limit
              }${
                postulantCourseState.filterQuery.length ? postulantCourseState.filterQuery : null
              }`,
            ),
          )
        : await dispatch(
            getNotCorrectedPostulants(
              id,
              `&page=${postulantCourseState.pagination.page}&limit=${
                postulantCourseState.pagination.limit
              }${
                postulantCourseState.filterQuery.length ? postulantCourseState.filterQuery : null
              }`,
            ),
          );

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
