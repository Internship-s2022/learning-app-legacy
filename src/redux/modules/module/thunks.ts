import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { disableModuleRequest, getModulesRequest } from './api';

export const getModules = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getModules.request(''));
    try {
      const response = await getModulesRequest({ id, query });
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

export const disableModule = (id: string, moduleId: string) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.disableModules.request(''));

    try {
      const response = await disableModuleRequest({ id }, moduleId);
      const moduleState = getState().module;
      if (response.error) {
        throw response;
      }
      if (response.data?._id) {
        await dispatch(
          getModules(
            id,
            `&page=${moduleState.pagination.page}&limit=${moduleState.pagination.limit}${
              moduleState.filterQuery.length ? moduleState.filterQuery : null
            }`,
          ),
        );
        dispatch(
          actions.disableModules.success({ data: response.data, pagination: response.pagination }),
        );
      }
    } catch (error) {
      dispatch(actions.disableModules.failure(error));
    }
  };
};
