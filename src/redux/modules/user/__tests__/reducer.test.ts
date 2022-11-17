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
import userReducer, { initialState } from '../reducer';
import { ActionsType } from '../types';
import { mockedUser } from './actions.test';

describe('User Reducer', () => {
  it('Should return the initial state by default', () => {
    const result = userReducer(undefined, { type: '', payload: '' } as unknown as ActionsType);

    expect(result).toBe(initialState);
  });

  it('Should return the correct state for each FETCHING actions', () => {
    const expectedResult = { isLoading: true };

    expect(userReducer(undefined, getUsers.request(''))).toMatchObject(expectedResult);
    expect(userReducer(undefined, deleteUser.request(''))).toMatchObject(expectedResult);
    expect(userReducer(undefined, createManualUser.request(''))).toMatchObject(expectedResult);
  });

  it('Should return the correct state for each ERROR actions', () => {
    const mockedPayload = { ...entityInitialState.errorData, error: true };

    expect(userReducer(undefined, getUsers.failure(mockedPayload))).toMatchObject({
      errorData: mockedPayload,
    });
    expect(userReducer(undefined, deleteUser.failure(mockedPayload))).toMatchObject({
      errorData: mockedPayload,
    });
    expect(userReducer(undefined, createManualUser.failure(mockedPayload))).toMatchObject({
      errorData: mockedPayload,
    });
  });

  it('Should return the correct state for GET_USERS_SUCCESS action', () => {
    const mockedPayload = { data: [mockedUser], pagination: entityInitialState.pagination };
    const result = userReducer(undefined, getUsers.success(mockedPayload));

    expect(result).toMatchObject({
      users: mockedPayload.data,
      pagination: mockedPayload.pagination,
    });
  });

  it('Should return the correct state for DELETE_USERS_SUCCESS', () => {
    const result = userReducer(undefined, deleteUser.success(''));

    expect(result).toMatchObject({ isLoading: false });
  });

  it('Should return the correct state for CREATE_MANUAL_USER_SUCCESS action', () => {
    const mockedPayload = { data: mockedUser };
    const result = userReducer(undefined, createManualUser.success(mockedPayload));

    expect(result).toMatchObject({
      user: mockedPayload.data,
    });
  });

  it('Should return the correct state for SET_USER action', () => {
    const result = userReducer(undefined, setUser(mockedUser));

    expect(result).toMatchObject({ user: mockedUser });
  });

  it('Should return the correct state for SET_QUERY action', () => {
    const mockedQuery = '?isActive=true';
    const result = userReducer(undefined, setQuery(mockedQuery));

    expect(result).toMatchObject({ filterQuery: mockedQuery });
  });

  it('Should return the initial state for RESET actions', () => {
    expect(userReducer(undefined, resetQuery())).toMatchObject(initialState);
    expect(userReducer(undefined, resetError())).toMatchObject(initialState);
  });
});
