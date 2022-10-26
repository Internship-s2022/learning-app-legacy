import { Dispatch } from 'redux';

import apiClient from 'src/config/api';

import * as actions from './actions';
import { User } from './types';

export const getUsers = (query: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getUsers.request(''));
    try {
      const response = await apiClient.get<User[]>(`/user${query}`);
      if (response.data?.length) {
        dispatch(
          actions.getUsers.success({ data: response.data, pagination: response.pagination }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getUsers.failure(error));
    }
  };
};

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.deleteUser.request(''));
    try {
      const response = await apiClient.patch<User>(`/user/${id}`);
      if (response.data?._id) {
        dispatch(actions.deleteUser.success(response.data._id));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.deleteUser.failure(error));
    }
  };
};
