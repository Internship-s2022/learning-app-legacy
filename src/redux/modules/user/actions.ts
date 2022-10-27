import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';

import { Actions, User } from './types';

export const setUser = (data: User) => action(Actions.SET_USER, data);

export const getUsers = createAsyncAction(
  Actions.GET_USERS_FETCHING,
  Actions.GET_USERS_SUCCESS,
  Actions.GET_USERS_ERROR,
)<string, { data: User[]; pagination: Pagination }, unknown>();

export const deleteUser = createAsyncAction(
  Actions.DELETE_USERS_FETCHING,
  Actions.DELETE_USERS_SUCCESS,
  Actions.DELETE_USERS_ERROR,
)<string, string, unknown>();
