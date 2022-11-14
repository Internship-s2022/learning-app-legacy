import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';
import { Course } from 'src/interfaces/entities/course';

import { RootReducer } from '../types';
import * as actions from './actions';

export const getCourses = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getCourses.request(''));
    try {
      const response = await apiClient.get<Course[]>(`/course${query}`);
      if (response.data?.length) {
        return dispatch(
          actions.getCourses.success({ data: response.data, pagination: response.pagination }),
        );
      }
    } catch (error) {
      dispatch(actions.getCourses.failure(error));
    }
  };
};

export const createCourse = (data) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.createCourse.request(''));
    try {
      const mappedCourseUsers = data.courseUsers?.map((e: any) => ({ ...e, user: e.user._id }));
      const response = await apiClient.post<Course>('/course', {
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
      dispatch(actions.createCourse.failure(error));
      return error;
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
      const response = await apiClient.patch<Course>(`/course/${id}`);
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
      const response = await apiClient.put<Course>(`/course/${id}`, data);
      if (response.data?._id) {
        return dispatch(actions.editCourse.success({ data: response.data }));
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.editCourse.failure(error));
      return error;
    }
  };
};
