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

export const createGroup = createAsyncAction(
  Actions.CREATE_GROUP_FETCHING,
  Actions.CREATE_GROUP_SUCCESS,
  Actions.CREATE_GROUP_ERROR,
)<NoParamForAction, { data: Group }, ErrorResponse>();
