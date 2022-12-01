import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import * as api from './api';

export const getAdmissionTests = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getAdmissionTests.request(''));
    try {
      const response = await api.getAdmissionTestRequest({ query });
      if (response.data?.length) {
        return dispatch(
          actions.getAdmissionTests.success({
            data: response.data,
            pagination: response.pagination,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.getAdmissionTests.failure(error));
    }
  };
};

export const deleteAdmissionTest = (id: string) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.deleteAdmissionTest.request(''));
    try {
      const response = await api.deleteAdmissionTestRequest({ id });
      const admissionTestState = getState().admissionTest;
      if (response.data?._id) {
        await dispatch(
          getAdmissionTests(
            `?isActive=true&page=${admissionTestState.pagination.page}&limit=${
              admissionTestState.pagination.limit
            }${admissionTestState.filterQuery.length ? admissionTestState.filterQuery : null}`,
          ),
        );
        return dispatch(actions.deleteAdmissionTest.success(''));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.deleteAdmissionTest.failure(error));
    }
  };
};

export const editAdmissionTests = (id: string, data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editAdmissionTest.request(''));
    try {
      const response = await api.editAdmissionTestRequest({ data, id });
      if (response.data?._id) {
        return dispatch(actions.editAdmissionTest.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editAdmissionTest.failure(error));
    }
  };
};

export const createAdmissionTests = (data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createAdmissionTest.request(''));
    try {
      const response = await api.createAdmissionTestRequest({ data });
      if (response.data?._id) {
        return dispatch(actions.createAdmissionTest.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.createAdmissionTest.failure(error));
    }
  };
};
