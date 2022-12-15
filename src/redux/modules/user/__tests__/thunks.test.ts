import { AxiosResponse } from 'axios';

import store from 'src/redux/store';

import { RootReducer } from '../../types';
import * as Api from '../api';
import { initialState } from '../reducer';
import { createManualUser, deleteUser, getUsers } from '../thunks';
import { Actions } from '../types';
import { mockedUser } from './actions.test';

describe('User Thunks', () => {
  const mockedDispatch = jest.fn();
  const mockedAxiosResponse: AxiosResponse = {
    data: undefined,
    headers: undefined,
    status: undefined,
    config: undefined,
    statusText: undefined,
    error: undefined,
    message: undefined,
  };
  const customState: RootReducer = {
    user: { ...initialState, user: mockedUser },
    auth: undefined,
    ui: undefined,
    course: undefined,
    courseUser: undefined,
    postulant: undefined,
    admissionTest: undefined,
    registrationForm: undefined,
    postulantCourse: undefined,
    report: undefined,
    module: undefined,
    question: undefined,
    group: undefined,
  };
  const mockedState = (store.getState = () => customState);

  it('GET ALL - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: [mockedUser] };

    jest.spyOn(Api, 'getUsersRequest').mockResolvedValue(mockedResponse);

    const functionResult = getUsers('');
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.GET_USERS_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.GET_USERS_SUCCESS,
      payload: mockedResponse,
    });
  });

  it('GET ALL - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'getUsersRequest').mockRejectedValue(mockedResponse);

    const functionResult = getUsers('');
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.GET_USERS_ERROR,
      payload: mockedResponse,
    });
  });

  it('CREATE MANUAL - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: mockedUser };

    jest.spyOn(Api, 'createManualUserRequest').mockResolvedValue(mockedResponse);

    const functionResult = createManualUser(mockedUser);
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.CREATE_MANUAL_USER_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.CREATE_MANUAL_USER_SUCCESS,
      payload: mockedResponse,
    });
  });

  it('CREATE MANUAL - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'createManualUserRequest').mockRejectedValue(mockedResponse);

    const functionResult = createManualUser(mockedUser);
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.CREATE_MANUAL_USER_ERROR,
      payload: mockedResponse,
    });
  });

  it('DELETE - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: mockedUser };

    jest.spyOn(Api, 'deleteUserRequest').mockResolvedValue(mockedResponse);

    const functionResultDelete = deleteUser(mockedUser._id);
    await functionResultDelete(mockedDispatch, mockedState);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.DELETE_USERS_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.DELETE_USERS_SUCCESS,
      payload: '',
    });
  });

  it('DELETE - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'deleteUserRequest').mockRejectedValue(mockedResponse);

    const functionResultDelete = deleteUser(mockedUser._id);
    await functionResultDelete(mockedDispatch, mockedState);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.DELETE_USERS_ERROR,
      payload: mockedResponse,
    });
  });
});
