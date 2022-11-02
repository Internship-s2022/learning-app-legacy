import { action, createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { User } from 'src/interfaces/entities';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const setUser = (data: User) => action(Actions.SET_USER, data);

export const setQuery = (data: string) => action(Actions.SET_QUERY, data);
export const resetQuery = () => action(Actions.RESET_QUERY);
export const resetError = () => action(Actions.RESET_ERROR);

export const getUsers = createAsyncAction(
  Actions.GET_USERS_FETCHING,
  Actions.GET_USERS_SUCCESS,
  Actions.GET_USERS_ERROR,
)<NoParamForAction, { data: User[]; pagination: Pagination }, ErrorResponse>();

export const deleteUser = createAsyncAction(
  Actions.DELETE_USERS_FETCHING,
  Actions.DELETE_USERS_SUCCESS,
  Actions.DELETE_USERS_ERROR,
)<NoParamForAction, NoParamForAction, ErrorResponse>();

export const createManualUser = createAsyncAction(
  Actions.CREATE_MANUAL_USER_FETCHING,
  Actions.CREATE_MANUAL_USER_SUCCESS,
  Actions.CREATE_MANUAL_USER_ERROR,
)<NoParamForAction, { data: User }, ErrorResponse>();
