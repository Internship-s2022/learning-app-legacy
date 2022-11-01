import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import apiClient from 'src/config/api';

import { RootReducer } from '../types';
import * as actions from './actions';
import { Course } from './types';

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
      if (response.error) {
        throw response;
      }
    } catch (error) {
      dispatch(actions.deleteCourse.failure(error));
    }
  };
};
