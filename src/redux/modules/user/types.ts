import { ActionType } from 'typesafe-actions';

import { GeneralDataType } from 'src/interfaces';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface User extends GeneralDataType {
  _id: string;
  email?: string;
  firebaseUid: string;
  postulantId: {
    _id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    location: string;
    dni: string;
    email: string;
    phone: string;
    isActive: boolean;
  };
  isInternal: boolean;
  isActive: boolean;
}

export interface State extends AsyncState {
  counter: number;
  user: User | undefined;
  users: User[];
}

export enum Actions {
  SET_USER = 'SET_USER',
  GET_USERS_FETCHING = 'GET_USERS_FETCHING',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
