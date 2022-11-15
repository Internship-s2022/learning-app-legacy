import { entityInitialState } from 'src/constants/redux';

import {
  createAdmissionTest,
  deleteAdmissionTest,
  getAdmissionTests,
  resetQuery,
  setQuery,
} from '../actions';
import admissionTestReducer, { initialState } from '../reducer';
import { ActionsType } from '../types';
import { mockedAdmissionTest } from './actions.test';

describe('Admission test Reducer', () => {
  it('Should return the initial state by default', () => {
    const result = admissionTestReducer(undefined, {
      type: '',
      payload: '',
    } as unknown as ActionsType);

    expect(result).toBe(initialState);
  });

  it('Should return the correct state for each FETCHING actions', () => {
    const expectedResult = { isLoading: true };

    expect(admissionTestReducer(undefined, getAdmissionTests.request(''))).toMatchObject(
      expectedResult,
    );
    expect(admissionTestReducer(undefined, deleteAdmissionTest.request(''))).toMatchObject(
      expectedResult,
    );
    expect(admissionTestReducer(undefined, createAdmissionTest.request(''))).toMatchObject(
      expectedResult,
    );
  });

  it('Should return the correct state for each ERROR actions', () => {
    const mockedPayload = { ...entityInitialState.errorData, error: true };

    expect(admissionTestReducer(undefined, getAdmissionTests.failure(mockedPayload))).toMatchObject(
      {
        errorData: mockedPayload,
      },
    );
    expect(
      admissionTestReducer(undefined, deleteAdmissionTest.failure(mockedPayload)),
    ).toMatchObject({
      errorData: mockedPayload,
    });
    expect(
      admissionTestReducer(undefined, createAdmissionTest.failure(mockedPayload)),
    ).toMatchObject({
      errorData: mockedPayload,
    });
  });

  it('Should return the correct state for GET_ADMISSION_TESTS_SUCCESS action', () => {
    const mockedPayload = {
      data: [mockedAdmissionTest],
      pagination: entityInitialState.pagination,
    };
    const result = admissionTestReducer(undefined, getAdmissionTests.success(mockedPayload));

    expect(result).toMatchObject({
      admissionTests: mockedPayload.data,
      pagination: mockedPayload.pagination,
    });
  });

  it('Should return the correct state for DELETE_ADMISSION_TESTS_SUCCESS', () => {
    const result = admissionTestReducer(undefined, deleteAdmissionTest.success(''));
    expect(result).toMatchObject({ isLoading: false });
  });

  it('Should return the correct state for CREATE_ADMISSION_TESTS_SUCCESS action', () => {
    const mockedPayload = { data: mockedAdmissionTest };
    const result = admissionTestReducer(undefined, createAdmissionTest.success(mockedPayload));
    expect(result).toMatchObject({
      admissionTests: [mockedAdmissionTest],
    });
  });

  it('Should return the correct state for SET_QUERY action', () => {
    const mockedQuery = '?isActive=true';
    const result = admissionTestReducer(undefined, setQuery(mockedQuery));
    expect(result).toMatchObject({ filterQuery: mockedQuery });
  });

  it('Should return the initial state for RESET actions', () => {
    expect(admissionTestReducer(undefined, resetQuery())).toMatchObject(initialState);
  });
});
