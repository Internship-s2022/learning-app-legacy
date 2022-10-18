import { Dispatch } from 'redux';

import apiClient from 'src/config/api';

import * as actions from './actions';
import { User } from './types';

export const getUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getUsers.request(''));
    try {
      const response = await apiClient.get<User[]>('/super-admin');
      if (response.data?.length) {
        dispatch(actions.getUsers.success(response.data));
      }
    } catch (error) {
      dispatch(actions.getUsers.failure(error));
    }
  };
};
