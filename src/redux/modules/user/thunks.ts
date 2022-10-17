import { Dispatch } from 'redux';

import apiClient from 'src/config/api';

import { ApiResponse, AppThunk } from '../types';
import * as actions from './actions';
import { User } from './types';

export const getUsers: AppThunk = () => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.getUsers.request(''));
    try {
      const response = await apiClient.get<ApiResponse<User[]>>('/super-admin');
      if (response.data?.data?.length) {
        dispatch(actions.getUsers.success(response.data.data));
      }
    } catch (error) {
      dispatch(actions.getUsers.failure(error));
    }
  };
};
