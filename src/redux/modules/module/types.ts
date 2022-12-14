import { ActionType } from 'typesafe-actions';

import { ModuleType } from 'src/interfaces/entities/module';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  modules: ModuleType[];
  filterQuery: string;
}

export enum Actions {
  GET_MODULES_FETCHING = 'GET_MODULES_FETCHING',
  GET_MODULES_SUCCESS = 'GET_MODULES_SUCCESS',
  GET_MODULES_ERROR = 'GET_MODULES_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
