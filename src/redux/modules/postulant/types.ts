import { ActionType } from 'typesafe-actions';

import { Postulant } from 'src/interfaces/entities';

import { AsyncState } from '../types';
import * as actions from './actions';
import * as thunks from './thunks';

export interface State extends AsyncState {
  postulant: Postulant | undefined;
}

export enum Actions {
  GET_POSTULANT_BY_DNI_FETCHING = 'GET_POSTULANT_BY_DNI_FETCHING',
  GET_POSTULANT_BY_DNI_SUCCESS = 'GET_POSTULANT_BY_DNI_SUCCESS',
  GET_POSTULANT_BY_DNI_ERROR = 'GET_POSTULANT_BY_DNI_ERROR',
  PUT_POSTULANT_FETCHING = 'PUT_POSTULANT_FETCHING',
  PUT_POSTULANT_SUCCESS = 'PUT_POSTULANT_SUCCESS',
  PUT_POSTULANT_ERROR = 'PUT_POSTULANT_ERROR',
}

export type ActionsType = ActionType<typeof actions | typeof thunks>;
