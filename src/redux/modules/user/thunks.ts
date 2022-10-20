import { Dispatch } from 'redux';

import apiClient from 'src/config/api';

import * as actions from './actions';
import { User } from './types';

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getUsers.request(''));
    try {
      const response = await apiClient.get<User[]>('/user');
      if (response.data?.length) {
        dispatch(
          actions.getUsers.success({ data: response.data, pagination: response.pagination }),
        );
      }
    } catch (error) {
      dispatch(actions.getUsers.failure(error));
    }
  };
};
