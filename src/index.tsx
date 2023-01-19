import './index.css';
import '@fontsource/roboto';
import '@fontsource/inter';
import '@fontsource/raleway';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import App from './app';
import { Modal } from './components/shared/ui';
import theme from './config/material-theme';
import store from './redux/store';
import reportWebVitals from './report-web-vitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
      <Modal />
    </Provider>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
