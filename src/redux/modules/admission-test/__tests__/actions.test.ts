import { entityInitialState } from 'src/constants/redux';

import {
  createAdmissionTest,
  deleteAdmissionTest,
  getAdmissionTests,
  resetQuery,
  setQuery,
} from '../actions';
import { Actions } from '../types';

export const mockedAdmissionTest = {
  _id: 'adadadadad121212121',
  name: 'Admission Test',
  isActive: true,
};

describe('Admission test actions', () => {
  it('Should return the set actions', () => {
    expect(setQuery('')).toMatchObject({ type: Actions.SET_ADMISSION_TESTS_QUERY, payload: '' });
  });

  it('Should return the reset actions', () => {
    expect(resetQuery()).toMatchObject({ type: Actions.RESET_ADMISSION_TESTS_QUERY });
  });

  it('Should return the fetching actions', () => {
    expect(getAdmissionTests.request('')).toMatchObject({
      type: Actions.GET_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
    expect(deleteAdmissionTest.request('')).toMatchObject({
      type: Actions.DELETE_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
    expect(createAdmissionTest.request('')).toMatchObject({
      type: Actions.CREATE_ADMISSION_TESTS_FETCHING,
      payload: '',
    });
  });

  it('Should return the error actions', () => {
    expect(getAdmissionTests.failure(entityInitialState.errorData)).toMatchObject({
      type: Actions.GET_ADMISSION_TESTS_ERROR,
      payload: entityInitialState.errorData,
    });
    expect(deleteAdmissionTest.failure(entityInitialState.errorData)).toMatchObject({
      type: Actions.DELETE_ADMISSION_TESTS_ERROR,
      payload: entityInitialState.errorData,
    });
    expect(createAdmissionTest.failure(entityInitialState.errorData)).toMatchObject({
      type: Actions.CREATE_ADMISSION_TESTS_ERROR,
      payload: entityInitialState.errorData,
    });
  });

  it('Should return the success actions', () => {
    const mockedPayload = { data: [], pagination: entityInitialState.pagination };
    expect(getAdmissionTests.success(mockedPayload)).toMatchObject({
      type: Actions.GET_ADMISSION_TESTS_SUCCESS,
      payload: mockedPayload,
    });
    expect(deleteAdmissionTest.success('')).toMatchObject({
      type: Actions.DELETE_ADMISSION_TESTS_SUCCESS,
      payload: '',
    });
    expect(createAdmissionTest.success({ data: mockedAdmissionTest })).toMatchObject({
      type: Actions.CREATE_ADMISSION_TESTS_SUCCESS,
      payload: { data: mockedAdmissionTest },
    });
  });
});
