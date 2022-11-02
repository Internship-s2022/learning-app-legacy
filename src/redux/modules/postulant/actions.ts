import { createAsyncAction } from 'typesafe-actions';

import { Postulant } from 'src/interfaces/entities/postulant';

import { Actions } from './types';

export const getPostulantByDni = createAsyncAction(
  Actions.GET_POSTULANT_BY_DNI_FETCHING,
  Actions.GET_POSTULANT_BY_DNI_SUCCESS,
  Actions.GET_POSTULANT_BY_DNI_ERROR,
)<string, { data: Postulant }, unknown>();

export const editPostulant = createAsyncAction(
  Actions.PUT_POSTULANT_FETCHING,
  Actions.PUT_POSTULANT_SUCCESS,
  Actions.PUT_POSTULANT_ERROR,
)<string, { data: Postulant }, unknown>();
