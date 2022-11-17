import { entityInitialState } from 'src/constants/redux';

import {
  createManualUser,
  deleteUser,
  getUsers,
  resetError,
  resetQuery,
  setQuery,
  setUser,
} from '../actions';
import { Actions } from '../types';

export const mockedUser = {
  firebaseUid: '',
  postulant: undefined,
  isInternal: false,
  isActive: false,
  _id: '123456',
};

describe('User actions', () => {
  it('Should return the set actions', () => {
    expect(setUser(mockedUser)).toMatchObject({ type: Actions.SET_USER, payload: mockedUser });
    expect(setQuery('')).toMatchObject({ type: Actions.SET_QUERY, payload: '' });
  });

  it('Should return the reset actions', () => {
    expect(resetQuery()).toMatchObject({ type: Actions.RESET_QUERY });
    expect(resetError()).toMatchObject({ type: Actions.RESET_ERROR });
  });

  it('Should return the fetching actions', () => {
    expect(getUsers.request('')).toMatchObject({ type: Actions.GET_USERS_FETCHING, payload: '' });
    expect(deleteUser.request('')).toMatchObject({
      type: Actions.DELETE_USERS_FETCHING,
      payload: '',
    });
    expect(createManualUser.request('')).toMatchObject({
      type: Actions.CREATE_MANUAL_USER_FETCHING,
      payload: '',
    });
  });

  it('Should return the error actions', () => {
    expect(getUsers.failure(entityInitialState.errorData)).toMatchObject({
      type: Actions.GET_USERS_ERROR,
      payload: entityInitialState.errorData,
    });
    expect(deleteUser.failure(entityInitialState.errorData)).toMatchObject({
      type: Actions.DELETE_USERS_ERROR,
      payload: entityInitialState.errorData,
    });
    expect(createManualUser.failure(entityInitialState.errorData)).toMatchObject({
      type: Actions.CREATE_MANUAL_USER_ERROR,
      payload: entityInitialState.errorData,
    });
  });

  it('Should return the success actions', () => {
    const mockedPayload = { data: [], pagination: entityInitialState.pagination };
    expect(getUsers.success(mockedPayload)).toMatchObject({
      type: Actions.GET_USERS_SUCCESS,
      payload: mockedPayload,
    });
    expect(deleteUser.success('')).toMatchObject({
      type: Actions.DELETE_USERS_SUCCESS,
      payload: '',
    });
    expect(createManualUser.success({ data: mockedUser })).toMatchObject({
      type: Actions.CREATE_MANUAL_USER_SUCCESS,
      payload: { data: mockedUser },
    });
  });
});
