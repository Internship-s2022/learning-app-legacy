import { legacy_createStore as createStore } from 'redux';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { render, RenderResult } from '@testing-library/react';

import theme from 'src/config/material-theme';
import rootReducer from 'src/redux/modules';
import { RootReducer } from 'src/redux/modules/types';

interface MockedWrapperProps {
  initialState?: Partial<RootReducer>;
  children?: ReactElement;
}

const MockedWrapper = ({ initialState, children }: MockedWrapperProps) => {
  const store = createStore(rootReducer, initialState);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: MockedWrapperProps): RenderResult => {
  return render(ui, {
    wrapper: (props) => <MockedWrapper {...props} initialState={options?.initialState} />,
    ...options,
  });
};

export * from '@testing-library/react';
export { customRender as render };
