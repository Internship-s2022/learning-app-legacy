import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';

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
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(getByTestId('layout-container-div')).toBeInTheDocument();
  });
});
