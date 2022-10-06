import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface User {
  _id: string;
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

export type AppThunk = ActionCreator<ThunkAction<void, RootReducer, null, Action<null>>>;
