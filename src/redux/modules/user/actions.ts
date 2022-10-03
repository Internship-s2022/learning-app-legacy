import { action, createAsyncAction } from 'typesafe-actions';

import { ApiResponse } from '../types';
import { Actions, User } from './types';

export const setUser = (data: User) => action(Actions.SET_USER, data);

export const getUsers = createAsyncAction(
  Actions.GET_USERS_FETCHING,
  Actions.GET_USERS_SUCCESS,
  Actions.GET_USERS_ERROR,
)<string, User[], ApiResponse<unknown>>();
