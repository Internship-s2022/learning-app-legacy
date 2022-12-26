import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { createGroupRequest, deleteGroupRequest, getGroupsRequest } from './api';

export const getGroups = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getGroups.request(''));
    try {
      const response = await getGroupsRequest({ id, query });
      if (response.data?.length) {
        return dispatch(
          actions.getGroups.success({ data: response.data, pagination: response.pagination }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getGroups.failure(error));
    }
  };
};

export const createGroup = (id: string, data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createGroup.request(''));
    try {
      const response = await createGroupRequest({ id, data });
      if (response.data?._id) {
        return dispatch(
          actions.createGroup.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.createGroup.failure(error));
    }
  };
};

export const disableGroup = (id: string, groupId: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.disableGroup.request(''));
    try {
      const response = await deleteGroupRequest({ id }, groupId);
      if (response.error) {
        throw response;
      }
      if (response.data?._id) {
        await dispatch(getGroups(id, ''));
        dispatch(actions.disableGroup.success({ data: response.data }));
      }
    } catch (error) {
      dispatch(actions.disableGroup.failure(error));
    }
  };
};
