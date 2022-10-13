import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';

import apiClient from 'src/config/api';
import { RootReducer } from 'src/redux/modules/types';

import { ApiResponse } from '../types';
import * as actions from './actions';
import { AppThunk, User } from './types';

export const getUsers: AppThunk = () => {
  const token = useSelector((state: RootReducer) => state.auth.authenticated?.token);

  return async (dispatch: Dispatch) => {
    dispatch(actions.getUsers.request(''));
    try {
      const response = await apiClient.get<ApiResponse<User[]>>('/user', {
        headers: { Authorization: `Basic ${token}` },
      });
      if (response.data?.data?.length) {
        dispatch(actions.getUsers.success(response.data.data));
      }
    } catch (error) {
      dispatch(actions.getUsers.failure(error));
    }
  };
};
