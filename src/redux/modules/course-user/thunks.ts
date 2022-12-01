import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { SelectedUsers } from 'src/interfaces/entities/course-user';

import { RootReducer } from '../types';
import * as actions from './actions';
import { addCourseUsersRequest, disableByUserIdRequest, getUsersInCourseRequest } from './api';

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
      if (response.error) {
        throw response;
      }
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

export const addCourseUsers = ({ course, users }: { course: string; users: SelectedUsers[] }) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.disableByUserId.request(''));
    try {
      const promises = users.map((user) =>
        addCourseUsersRequest({
          data: { course, user: user.user._id, role: user.role, isActive: true },
        }),
      );
      const responses = await Promise.all(promises);
      if (responses.some((response) => response.error)) {
        const response = responses.find((response) => response.error);
        throw response;
      }
      await dispatch(getUsersInCourse(course, '?isActive=true&limit=1000'));
      return dispatch(
        actions.addCourseUsers.success({
          data: responses.map((response) => response.data),
        }),
      );
    } catch (error) {
      return dispatch(actions.addCourseUsers.failure(error));
    }
  };
};
