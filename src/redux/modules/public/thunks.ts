import { ThunkDispatch } from 'redux-thunk';
import { ActionType } from 'typesafe-actions';

import { RootReducer } from '../types';
import * as actions from './actions';
import * as api from './api';

export const getPublicCourses = (query: string) => {
  return async (dispatch: ThunkDispatch<RootReducer, null, ActionType<typeof actions>>) => {
    dispatch(actions.getPublicCourses.request(''));
    try {
      const response = await api.getPublicCourses({ query });
      if (response.data?.length) {
        return dispatch(
          actions.getPublicCourses.success({
            data: response.data,
          }),
        );
      }
      if (response.error) {
        throw response;
      }
    } catch (error) {
      return dispatch(actions.getPublicCourses.failure(error));
    }
  };
};
