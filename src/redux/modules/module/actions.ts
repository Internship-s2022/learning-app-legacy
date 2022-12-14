import { createAsyncAction } from 'typesafe-actions';

import { Pagination } from 'src/interfaces';
import { ErrorResponse } from 'src/interfaces/api';
import { ModuleType } from 'src/interfaces/entities/module';

import { NoParamForAction } from '../types';
import { Actions } from './types';

export const getModules = createAsyncAction(
  Actions.GET_MODULES_FETCHING,
  Actions.GET_MODULES_SUCCESS,
  Actions.GET_MODULES_ERROR,
)<NoParamForAction, { data: ModuleType[]; pagination: Pagination }, ErrorResponse>();

export const disableModules = createAsyncAction(
  Actions.DISABLE_MODULE_FETCHING,
  Actions.DISABLE_MODULE_SUCCESS,
  Actions.DISABLE_MODULE_ERROR,
)<NoParamForAction, { data: ModuleType; pagination: Pagination }, ErrorResponse>();
