import { ActionType } from 'typesafe-actions';

import { User } from 'src/interfaces/entities/user';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  user: User | undefined;
  users: User[];
  filterQuery: string;
}

export enum Actions {
  SET_USER = 'SET_USER',
  GET_USERS_FETCHING = 'GET_USERS_FETCHING',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
  DELETE_USERS_FETCHING = 'DELETE_USERS_FETCHING',
  DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS',
  DELETE_USERS_ERROR = 'DELETE_USERS_ERROR',
  SET_USER_QUERY = 'SET_USER_QUERY',
  RESET_USER_QUERY = 'RESET_USER_QUERY',
  CREATE_MANUAL_USER_FETCHING = 'CREATE_MANUAL_USER_FETCHING',
  CREATE_MANUAL_USER_SUCCESS = 'CREATE_MANUAL_USER_SUCCESS',
  CREATE_MANUAL_USER_ERROR = 'CREATE_MANUAL_USER_ERROR',
  RESET_ERROR = 'RESET_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
