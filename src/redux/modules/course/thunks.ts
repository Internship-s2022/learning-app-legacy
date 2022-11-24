import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';
import { Course, CourseUserById, SelectedUsers } from 'src/interfaces/entities/course';

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
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.getCourses.failure(error));
    }
  };
};

export const getCourseUserById = (id: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getCourseUserById.request(''));
    try {
      const response = await apiClient.get<CourseUserById[]>(`/course-user/by-user/${id}`);

      return dispatch(
        actions.getCourseUserById.success([
          {
            _id: '507f1f77bcf86cdcc4400000',
            course: {
              _id: '1e063109a88495b45758c001',
              name: 'React Native',
              description: 'Curso express de React Native',
              inscriptionStartDate: '2022-07-25T14:06:01.005Z',
              inscriptionEndDate: '2023-05-01T14:06:01.005Z',
              startDate: '2023-05-01T14:06:01.005Z',
              endDate: '2023-08-29T14:06:01.005Z',
              type: 'EXPRESS',
              isInternal: 'true',
              isActive: true,
            },
            user: '507f1f77bcf86cd799400000',
            role: 'ADMIN',
            isActive: true,
          },
        ]),
      );
    } catch (error) {
      dispatch(actions.getCourseUserById.failure(error));
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
    }
  };
};
