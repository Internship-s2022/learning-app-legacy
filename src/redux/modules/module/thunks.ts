import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import {
  createModuleRequest,
  disableModuleRequest,
  editModuleRequest,
  getModuleByIdRequest,
  getModulesRequest,
} from './api';

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

export const getModuleById = (id: string, moduleId: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getModuleById.request(''));
    try {
      const response = await getModuleByIdRequest({ id }, moduleId);
      if (response.error) {
        throw response;
      }
      return dispatch(actions.getModuleById.success({ data: response.data }));
    } catch (error) {
      return dispatch(actions.getModuleById.failure(error));
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

export const createModule = (id: string, data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createModule.request(''));
    try {
      const response = await createModuleRequest({
        id,
        data,
      });
      if (response.data?._id) {
        return dispatch(
          actions.createModule.success({
            data: response.data,
            pagination: {
              totalDocs: 0,
              limit: 0,
              totalPages: 0,
              page: 0,
              pagingCounter: 0,
              hasPrevPage: false,
              hasNextPage: false,
              prevPage: 0,
              nextPage: 0,
            },
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.createModule.failure(error));
    }
  };
};

export const editModule = (id: string, moduleId: string, data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editModule.request(''));
    try {
      const response = await editModuleRequest({ id, data }, moduleId);
      if (response.data?._id) {
        return dispatch(actions.editModule.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editModule.failure(error));
    }
  };
};
