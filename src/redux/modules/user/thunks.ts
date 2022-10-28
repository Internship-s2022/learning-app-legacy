import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';

import { RootReducer } from '../types';
import * as actions from './actions';
import { User } from './types';

export const getUsers = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
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
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.deleteUser.request(''));
    try {
      const response = await apiClient.patch<User>(`/user/${id}`);
      const userState = getState().user;
      if (response.data?._id) {
        await dispatch(
          getUsers(
            `?isActive=true&page=${userState.pagination.page}&limit=${userState.pagination.limit}${
              userState.filterQuery.length ? userState.filterQuery : null
            }`,
          ),
        );
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
