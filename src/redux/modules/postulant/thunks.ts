import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';

import { RootReducer } from '../types';
import * as actions from './actions';
import { Postulant } from './types';

export const getPostulantByDni = (dni: Postulant['dni']) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getPostulantByDni.request(''));
    try {
      const response = await apiClient.get<Postulant>(`/postulant/${dni}`);
      if (response.data?._id) {
        return dispatch(
          actions.getPostulantByDni.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getPostulantByDni.failure(error));
      return error;
    }
  };
};

export const editPostulant = (id: Postulant['_id'], data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editPostulant.request(''));
    try {
      const response = await apiClient.put<Postulant>(`/postulant/${id}`, data);
      if (response.data?._id) {
        return dispatch(actions.editPostulant.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editPostulant.failure(error));
      return error;
    }
  };
};
