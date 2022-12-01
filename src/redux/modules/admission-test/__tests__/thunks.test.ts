import { AxiosResponse } from 'axios';

import store from 'src/redux/store';

import { RootReducer } from '../../types';
import * as Api from '../api';
import { initialState } from '../reducer';
import {
  createAdmissionTests,
  deleteAdmissionTest,
  editAdmissionTests,
  getAdmissionTests,
} from '../thunks';
import { Actions } from '../types';
import { mockedAdmissionTest } from './actions.test';

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
    admissionTest: { ...initialState, admissionTest: mockedAdmissionTest },
    auth: undefined,
    ui: undefined,
    course: undefined,
    courseUser: undefined,
    postulant: undefined,
    user: undefined,
  };
  const mockedState = (store.getState = () => customState);

  it('GET ALL - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: [mockedAdmissionTest] };

    jest.spyOn(Api, 'getAdmissionTestRequest').mockResolvedValue(mockedResponse);

    const functionResult = getAdmissionTests('');
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.GET_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.GET_ADMISSION_TESTS_SUCCESS,
      payload: mockedResponse,
    });
  });

  it('GET ALL - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'getAdmissionTestRequest').mockRejectedValue(mockedResponse);

    const functionResult = getAdmissionTests('');
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.GET_ADMISSION_TESTS_ERROR,
      payload: mockedResponse,
    });
  });

  it('CREATE MANUAL - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: mockedAdmissionTest };

    jest.spyOn(Api, 'createAdmissionTestRequest').mockResolvedValue(mockedResponse);

    const functionResult = createAdmissionTests(mockedAdmissionTest);
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.CREATE_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.CREATE_ADMISSION_TESTS_SUCCESS,
      payload: mockedResponse,
    });
  });

  it('CREATE MANUAL - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'createAdmissionTestRequest').mockRejectedValue(mockedResponse);

    const functionResult = createAdmissionTests(mockedAdmissionTest);
    await functionResult(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.CREATE_ADMISSION_TESTS_ERROR,
      payload: mockedResponse,
    });
  });

  it('DELETE - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: mockedAdmissionTest };

    jest.spyOn(Api, 'deleteAdmissionTestRequest').mockResolvedValue(mockedResponse);

    const functionResultDelete = deleteAdmissionTest(mockedAdmissionTest._id);
    await functionResultDelete(mockedDispatch, mockedState);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.DELETE_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.DELETE_ADMISSION_TESTS_SUCCESS,
      payload: '',
    });
  });

  it('DELETE - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'deleteAdmissionTestRequest').mockRejectedValue(mockedResponse);

    const functionResultDelete = deleteAdmissionTest(mockedAdmissionTest._id);
    await functionResultDelete(mockedDispatch, mockedState);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.DELETE_ADMISSION_TESTS_ERROR,
      payload: mockedResponse,
    });
  });

  it('EDIT - Should dispatch the pending and success action', async () => {
    const mockedResponse = { ...mockedAxiosResponse, data: mockedAdmissionTest };

    jest.spyOn(Api, 'editAdmissionTestRequest').mockResolvedValue(mockedResponse);

    const functionResultEdit = editAdmissionTests(mockedAdmissionTest._id, mockedAdmissionTest);
    await functionResultEdit(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.PUT_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.PUT_ADMISSION_TESTS_SUCCESS,
      payload: mockedResponse,
    });
  });

  it('EDIT - Should dispatch the error action', async () => {
    const mockedResponse = { error: true };

    jest.spyOn(Api, 'editAdmissionTestRequest').mockRejectedValue(mockedResponse);

    const functionResultEdit = editAdmissionTests(mockedAdmissionTest._id, mockedAdmissionTest);
    await functionResultEdit(mockedDispatch);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: Actions.PUT_ADMISSION_TESTS_ERROR,
      payload: mockedResponse,
    });
  });
});
