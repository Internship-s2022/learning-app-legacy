import { ActionType } from 'typesafe-actions';

import { Group } from 'src/interfaces/entities/group';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  groups: Group[];
  group: Group;
  filterQuery: string;
}

export enum Actions {
  GET_GROUPS_FETCHING = 'GET_GROUPS_FETCHING',
  GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS',
  GET_GROUPS_ERROR = 'GET_GROUPS_ERROR',
  GET_GROUP_FETCHING = 'GET_GROUP_FETCHING',
  GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS',
  GET_GROUP_ERROR = 'GET_GROUP_ERROR',
  CREATE_GROUP_FETCHING = 'CREATE_GROUP_FETCHING',
  CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS',
  CREATE_GROUP_ERROR = 'CREATE_GROUP_ERROR',
  EDIT_GROUP_FETCHING = 'EDIT_GROUP_FETCHING',
  EDIT_GROUP_SUCCESS = 'EDIT_GROUP_SUCCESS',
  EDIT_GROUP_ERROR = 'EDIT_GROUP_ERROR',
  DELETE_GROUP_FETCHING = 'DELETE_GROUP_FETCHING',
  DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS',
  DELETE_GROUP_ERROR = 'DELETE_GROUP_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
