import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import { disableByUserIdRequest, getUsersInCourseRequest } from './api';

export const getUsersInCourse = (id: string, query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getUsersByCourseId.request(''));
    try {
      const response = await getUsersInCourseRequest({ id, query });
      if (response.error) {
        throw response;
      }
      return dispatch(
        actions.getUsersByCourseId.success({
          data: response.data,
          pagination: response.pagination,
        }),
      );
    } catch (error) {
      return dispatch(actions.getUsersByCourseId.failure(error));
    }
  };
};

export const disableByUserId = (data: { course: string; user: string }) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.disableByUserId.request(''));
    try {
      const response = await disableByUserIdRequest({ data });
      const courseUserState = getState().courseUser;
      if (response.data?._id) {
        await dispatch(
          getUsersInCourse(
            data.course,
            `?isActive=true&page=${courseUserState.pagination.page}&limit=${
              courseUserState.pagination.limit
            }${courseUserState.filterQuery.length ? courseUserState.filterQuery : null}`,
          ),
        );
        dispatch(actions.disableByUserId.success(''));
      }
    } catch (error) {
      dispatch(actions.disableByUserId.failure(error));
    }
  };
};
