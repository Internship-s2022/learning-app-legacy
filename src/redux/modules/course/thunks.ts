import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { Course, SelectedUsers } from 'src/interfaces/entities/course';

import { RootReducer } from '../types';
import * as actions from './actions';
import {
  createCourseRequest,
  deleteCourseRequest,
  editCourseRequest,
  getCourseByIdRequest,
  getCoursesRequest,
} from './api';

export const getCourses = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getCourses.request(''));
    try {
      const response = await getCoursesRequest({ query });
      if (response.data?.length) {
        return dispatch(
          actions.getCourses.success({ data: response.data, pagination: response.pagination }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getCourses.failure(error));
    }
  };
};

export const getCourseById = (id: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getCourseById.request(''));
    try {
      const response = await getCourseByIdRequest({ id });
      if (response.error) {
        throw response;
      }
      return dispatch(actions.getCourseById.success({ data: response.data }));
    } catch (error) {
      return dispatch(actions.getCourseById.failure(error));
    }
  };
};

export const createCourse = (data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createCourse.request(''));
    try {
      const mappedCourseUsers = data.courseUsers.map((e: SelectedUsers) => ({
        ...e,
        user: e.user._id,
      }));
      const response = await createCourseRequest({
        ...data,
        courseUsers: mappedCourseUsers,
      });
      if (response.data?._id) {
        return dispatch(
          actions.createCourse.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.createCourse.failure(error));
    }
  };
};

export const deleteCourse = (id: string) => {
  return async (
    dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>,
    getState: () => RootReducer,
  ) => {
    dispatch(actions.deleteCourse.request(''));
    try {
      const response = await deleteCourseRequest({ id });
      const courseState = getState().course;
      if (response.data?._id) {
        await dispatch(
          getCourses(
            `?isActive=true&page=${courseState.pagination.page}&limit=${
              courseState.pagination.limit
            }${courseState.filterQuery.length ? courseState.filterQuery : null}`,
          ),
        );
        dispatch(actions.deleteCourse.success(''));
      }
    } catch (error) {
      dispatch(actions.deleteCourse.failure(error));
    }
  };
};

export const editCourse = (id: Course['_id'], data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.editCourse.request(''));
    try {
      const response = await editCourseRequest({ id, data });
      if (response.data?._id) {
        return dispatch(actions.editCourse.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editCourse.failure(error));
    }
  };
};
