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

export const getModuleById = createAsyncAction(
  Actions.GET_MODULE_BY_ID_FETCHING,
  Actions.GET_MODULE_BY_ID_SUCCESS,
  Actions.GET_MODULE_BY_ID_ERROR,
)<NoParamForAction, { data: ModuleType }, ErrorResponse>();

export const disableModules = createAsyncAction(
  Actions.DISABLE_MODULE_FETCHING,
  Actions.DISABLE_MODULE_SUCCESS,
  Actions.DISABLE_MODULE_ERROR,
)<NoParamForAction, { data: ModuleType; pagination: Pagination }, ErrorResponse>();

export const createModule = createAsyncAction(
  Actions.CREATE_MODULE_FETCHING,
  Actions.CREATE_MODULE_SUCCESS,
  Actions.CREATE_MODULE_ERROR,
)<NoParamForAction, { data: ModuleType }, ErrorResponse>();

export const editModule = createAsyncAction(
  Actions.EDIT_MODULE_FETCHING,
  Actions.EDIT_MODULE_SUCCESS,
  Actions.EDIT_MODULE_ERROR,
)<NoParamForAction, { data: ModuleType }, ErrorResponse>();
