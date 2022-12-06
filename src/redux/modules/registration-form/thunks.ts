import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import * as api from './api';

export const getRegistrationForms = () => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getRegistrationForms.request(''));
    try {
      const response = await api.getRegistrationFormRequest();
      if (response.data?.length) {
        return dispatch(
          actions.getRegistrationForms.success({
            data: response.data,
            pagination: response.pagination,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.getRegistrationForms.failure(error));
    }
  };
};

export const getRegistrationFormByCourseId = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getRegistrationFormByCourseId.request(''));
    try {
      const response = await api.getRegistrationFormByCourseIdRequest({ query });
      if (response) {
        return dispatch(actions.getRegistrationFormByCourseId.success(response.data[0]));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.getRegistrationFormByCourseId.failure(error));
    }
  };
};
