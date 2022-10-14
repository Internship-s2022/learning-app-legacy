import { ActionType } from 'typesafe-actions';

import { GeneralDataType } from 'src/interfaces';

import * as actions from './actions';
import * as thunks from './thunks';

export interface User extends GeneralDataType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
}

export interface State {
  counter: number;
  user: User | undefined;
  users: User[];
  isLoading: boolean;
  error: string | undefined;
}

export enum Actions {
  SET_USER = 'SET_USER',
  GET_USERS_FETCHING = 'GET_USERS_FETCHING',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
