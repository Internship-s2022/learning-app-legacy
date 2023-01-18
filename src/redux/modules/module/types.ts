import { ActionType } from 'typesafe-actions';

import { ModuleType } from 'src/interfaces/entities/module';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  module: ModuleType;
  modules: ModuleType[];
  filterQuery: string;
}

export enum Actions {
  GET_MODULES_FETCHING = 'GET_MODULES_FETCHING',
  GET_MODULES_SUCCESS = 'GET_MODULES_SUCCESS',
  GET_MODULES_ERROR = 'GET_MODULES_ERROR',
  GET_MODULE_BY_ID_FETCHING = 'GET_MODULE_BY_ID_FETCHING',
  GET_MODULE_BY_ID_SUCCESS = 'GET_MODULE_BY_ID_SUCCESS',
  GET_MODULE_BY_ID_ERROR = 'GET_MODULE_BY_ID_ERROR',
  DISABLE_MODULE_FETCHING = 'DISABLE_MODULE_FETCHING',
  DISABLE_MODULE_SUCCESS = 'DISABLE_MODULE_SUCCESS',
  DISABLE_MODULE_ERROR = 'DISABLE_MODULE_ERROR',
  CREATE_MODULE_FETCHING = 'CREATE_MODULE_FETCHING',
  CREATE_MODULE_SUCCESS = 'CREATE_MODULE_SUCCESS',
  CREATE_MODULE_ERROR = 'CREATE_MODULE_ERROR',
  EDIT_MODULE_FETCHING = 'EDIT_MODULE_FETCHING',
  EDIT_MODULE_SUCCESS = 'EDIT_MODULE_SUCCESS',
  EDIT_MODULE_ERROR = 'EDIT_MODULE_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
