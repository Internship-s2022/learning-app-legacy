import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import {
  createGroupRequest,
  deleteGroupRequest,
  editGroupRequest,
  getGroupRequest,
  getGroupsRequest,
} from './api';

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

export const getGroup = (id: string, groupId: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getGroup.request(''));
    try {
      const response = await getGroupRequest({ id }, groupId);
      if (response.data) {
        return dispatch(actions.getGroup.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getGroup.failure(error));
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
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.disableGroup.request(''));
    const { pagination, filterQuery } = getState().group;
    try {
      const response = await deleteGroupRequest({ id }, groupId);
      if (response.error) {
        throw response;
      }
      if (response.data?._id) {
        await dispatch(
          getGroups(
            id,
            `?isActive=true&sort[name]=1&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
          ),
        );
        dispatch(actions.disableGroup.success({ data: response.data }));
      }
    } catch (error) {
      dispatch(actions.disableGroup.failure(error));
    }
  };
};

export const editGroup = (id: string, groupId: string, data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editGroup.request(''));
    try {
      const response = await editGroupRequest({ id, data }, groupId);
      if (response.data?._id) {
        await dispatch(getGroup(id, groupId));

        return dispatch(actions.editGroup.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editGroup.failure(error));
    }
  };
};
