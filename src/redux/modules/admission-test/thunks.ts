import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';
import { AdmissionTest } from 'src/interfaces/entities';

import { RootReducer } from '../types';
import * as actions from './actions';

export const getAdmissionTests = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getAdmissionTests.request(''));
    try {
      const response = await apiClient.get<AdmissionTest[]>(`/admission-test${query}`);
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
      dispatch(actions.getAdmissionTests.failure(error));
      return error;
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
      const response = await apiClient.patch<AdmissionTest>(`/admission-test/${id}`);
      const admissionTestState = getState().admissionTest;
      if (response.data?._id) {
        await dispatch(
          getAdmissionTests(
            `?isActive=true&page=${admissionTestState.pagination.page}&limit=${
              admissionTestState.pagination.limit
            }${admissionTestState.filterQuery.length ? admissionTestState.filterQuery : null}`,
          ),
        );
        dispatch(actions.deleteAdmissionTest.success(''));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.deleteAdmissionTest.failure(error));
    }
  };
};
