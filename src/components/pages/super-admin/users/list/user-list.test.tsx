import React from 'react';

import { entityInitialState } from 'src/constants/redux';
import * as Store from 'src/redux';
import { render } from 'src/utils/custom-render';

import ListUser from '.';
const mokedDispatch = jest.fn();

const mockFunction = () => {
  jest.spyOn(Store, 'useAppDispatch').mockReturnValue(mokedDispatch);
};

describe('List Users Screen', () => {
  const customInitialState = {
    user: {
      user: undefined,
      users: [],
      isLoading: false,
      filterQuery: '',
      ...entityInitialState,
    },
  };

  it('Should render the preloader component', () => {
    mockFunction();
    const { queryByTestId } = render(<ListUser />, {
      initialState: { user: { ...customInitialState.user, isLoading: true } },
    });
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('shared-component-circular-loader')).toBeInTheDocument();
  });

  it('Should render the list users main container and the table', () => {
    mockFunction();
    const { queryByTestId } = render(<ListUser />);
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('list-users-container-div')).toBeInTheDocument();
    expect(queryByTestId('shared-component-table')).toBeInTheDocument();
  });

  it('Should render an error message instead of the table if there is an error with status different from 404', () => {
    mockFunction();
    const { queryByTestId } = render(<ListUser />, {
      initialState: {
        user: {
          ...customInitialState.user,
          errorData: { ...entityInitialState.errorData, error: true, status: 400 },
        },
      },
    });
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('shared-component-table')).not.toBeInTheDocument();
    expect(queryByTestId('list-users-title-container-div-error')).toBeInTheDocument();
  });

  it('Should render the table if there is an error with status 404', () => {
    mockFunction();
    const { queryByTestId } = render(<ListUser />, {
      initialState: {
        user: {
          ...customInitialState.user,
          errorData: { ...entityInitialState.errorData, error: true, status: 404 },
        },
      },
    });
    expect(mokedDispatch).toHaveBeenCalled();
    expect(queryByTestId('shared-component-table')).toBeInTheDocument();
  });
});
