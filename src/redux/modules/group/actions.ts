import { createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { Group } from 'src/interfaces/entities/group';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const getGroups = createAsyncAction(
  Actions.GET_GROUPS_FETCHING,
  Actions.GET_GROUPS_SUCCESS,
  Actions.GET_GROUPS_ERROR,
)<NoParamForAction, { data: Group[]; pagination: Pagination }, ErrorResponse>();

export const getGroup = createAsyncAction(
  Actions.GET_GROUP_FETCHING,
  Actions.GET_GROUP_SUCCESS,
  Actions.GET_GROUP_ERROR,
)<NoParamForAction, { data: Group }, ErrorResponse>();

export const createGroup = createAsyncAction(
  Actions.CREATE_GROUP_FETCHING,
  Actions.CREATE_GROUP_SUCCESS,
  Actions.CREATE_GROUP_ERROR,
)<NoParamForAction, { data: Group }, ErrorResponse>();

export const editGroup = createAsyncAction(
  Actions.EDIT_GROUP_FETCHING,
  Actions.EDIT_GROUP_SUCCESS,
  Actions.EDIT_GROUP_ERROR,
)<NoParamForAction, { data: Group }, ErrorResponse>();

export const disableGroup = createAsyncAction(
  Actions.DELETE_GROUP_FETCHING,
  Actions.DELETE_GROUP_SUCCESS,
  Actions.DELETE_GROUP_ERROR,
)<NoParamForAction, { data: Group }, ErrorResponse>();
