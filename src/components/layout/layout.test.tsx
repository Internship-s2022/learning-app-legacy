import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

import store from 'src/redux/store';
import AppRoutes from 'src/routes';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  cleanup();
});

describe('Layout Component', () => {
  test.skip('Layout Rendering', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>,
    );
    expect(getByTestId('layout-container-div')).toBeInTheDocument();
  });
});
