import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { getModulesRequest } from './api';

export const getModules = (id: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getModules.request(''));
    try {
      const response = await getModulesRequest({ id });
      if (response.data?.length) {
        return dispatch(
          actions.getModules.success({ data: response.data, pagination: response.pagination }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getModules.failure(error));
    }
  };
};
