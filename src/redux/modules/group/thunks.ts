import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { createGroupRequest, getGroupsRequest } from './api';

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
