import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { cleanup, render } from '@testing-library/react';

import store from 'src/redux/store';

import App from '../../app';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  cleanup();
});

describe('Layout Component', () => {
  test('Layout Rendering', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      </Provider>,
    );
    expect(getByTestId('layout-container-div')).toBeInTheDocument();
  });
});
