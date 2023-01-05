import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { entityInitialState } from 'src/constants/redux';
import * as Store from 'src/redux';
import { mockedAdmissionTest } from 'src/redux/modules/admission-test/__tests__/actions.test';
import { act, render } from 'src/utils/custom-render';

import AdmissionTestsList from '.';
const mokedDispatch = jest.fn();

const mockFunction = () => {
  jest.spyOn(Store, 'useAppDispatch').mockReturnValue(mokedDispatch);
};

describe('List Admission test Screen render components', () => {
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

  it('Should render an error message instead of the table if there is an error with status different from 500', () => {
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

const setup = (initialState) => {
  const utils = render(<AdmissionTestsList />, {
    initialState: initialState,
  });
  const input = utils.getByLabelText('Ingrese nombre del test');
  const addButton = utils.queryByTestId('add-admission-test-button');
  return {
    input,
    addButton,
    ...utils,
  };
};

describe('List Admission test Screen functional test', () => {
  beforeEach(() => {
    mockFunction();
  });

  const customInitialState = {
    admissionTest: {
      admissionTest: undefined,
      admissionTests: [],
      isLoading: false,
      filterQuery: '',
      ...entityInitialState,
    },
  };

  it('Should render the Input component', () => {
    const { input } = setup(customInitialState);
    expect(input).toBeInTheDocument();
  });

  it('Should render the Add/Edit button component', () => {
    const { addButton } = setup(customInitialState);
    expect(addButton).toBeInTheDocument();
  });

  it('Should fill the input', () => {
    const { input } = setup(customInitialState);
    userEvent.type(input, 'Gorilla');
    expect(input).toHaveValue('Gorilla');
  });

  it('Should render cancel icon only when text is written', () => {
    const { input, ...utils } = setup(customInitialState);
    expect(utils.queryByTestId('cancel-admission-test-button')).toBeNull();
    userEvent.type(input, 'Gorilla');
    expect(utils.queryByTestId('cancel-admission-test-button')).toBeInTheDocument();
  });

  it('Should clear the input when clicking cancel icon', () => {
    const { input, ...utils } = setup(customInitialState);
    userEvent.type(input, 'Gorilla');
    userEvent.click(utils.queryByTestId('cancel-admission-test-button'));
    expect(input).toHaveValue('');
  });

  it('Should render disabled addButton when text input has less than 3 characters', () => {
    const { input, addButton } = setup(customInitialState);
    userEvent.type(input, 'Go');
    expect(addButton).toBeDisabled();
  });

  it('Should render disabled addButton when text input has more than 50 characters', () => {
    const { input, addButton } = setup(customInitialState);
    userEvent.type(input, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    expect(addButton).toBeDisabled();
  });

  it('Should render error message when text input has less than 3 characters', async () => {
    const { input, ...utils } = setup(customInitialState);

    act(() => {
      userEvent.type(input, 'Go');
    });

    await waitFor(() => {
      expect(
        utils.getByText('Nombre inválido, debe contener más de 3 caracteres.'),
      ).toBeInTheDocument();
    });
  });

  it('Should render error message when text input has more than 50 characters', async () => {
    const { input, ...utils } = setup(customInitialState);

    act(() => {
      userEvent.type(input, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    });

    await waitFor(() => {
      expect(
        utils.getByText('Nombre inválido, no debe contener más de 50 caracteres.'),
      ).toBeInTheDocument();
    });
  });

  it('Should fill the input with the name of the admission test to edit when clicking the edit button of the table', () => {
    const { input, ...utils } = setup({
      admissionTest: { ...customInitialState.admissionTest, admissionTests: [mockedAdmissionTest] },
    });

    const editButton = utils.queryByTestId('edit-button-0');

    act(() => {
      userEvent.click(editButton);
    });

    expect(input).toHaveValue(mockedAdmissionTest.name);
  });
});
