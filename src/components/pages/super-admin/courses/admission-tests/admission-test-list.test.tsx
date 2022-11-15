import React from 'react';

import { entityInitialState } from 'src/constants/redux';
import * as Store from 'src/redux';
import { render } from 'src/utils/custom-render';

import AdmissionTestsList from '.';
const mokedDispatch = jest.fn();

const mockFunction = () => {
  jest.spyOn(Store, 'useAppDispatch').mockReturnValue(mokedDispatch);
};

describe('List Admission test Screen', () => {
  const customInitialState = {
    admissionTest: {
      admissionTest: undefined,
      admissionTests: [],
      isLoading: false,
      filterQuery: '',
      ...entityInitialState,
    },
  };

  it('Should render the loader component', () => {
    mockFunction();
    const { queryByTestId } = render(<AdmissionTestsList />, {
      initialState: { admissionTest: { ...customInitialState.admissionTest, isLoading: true } },
    });
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('component-linear-loader')).toBeInTheDocument();
  });

  it('Should render the admission test list main container and the table', () => {
    mockFunction();
    const { queryByTestId } = render(<AdmissionTestsList />);
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('list-admTest-container-div')).toBeInTheDocument();
    expect(queryByTestId('shared-component-table')).toBeInTheDocument();
  });

  it('Should render an error message instead of the table if there is an error with status different from 404', () => {
    mockFunction();
    const { queryByTestId } = render(<AdmissionTestsList />, {
      initialState: {
        admissionTest: {
          ...customInitialState.admissionTest,
          errorData: { ...entityInitialState.errorData, error: true, status: 500 },
        },
      },
    });
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('shared-component-table')).not.toBeInTheDocument();
    expect(queryByTestId('list-admTest-title-container-div-error')).toBeInTheDocument();
  });

  it('Should render the table if there is an error with status 404', () => {
    mockFunction();
    const { queryByTestId } = render(<AdmissionTestsList />, {
      initialState: {
        admissionTest: {
          ...customInitialState.admissionTest,
          errorData: { ...entityInitialState.errorData, error: true, status: 404 },
        },
      },
    });
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('shared-component-table')).toBeInTheDocument();
    expect(queryByTestId('empty-table-div')).toBeInTheDocument();
  });
});
