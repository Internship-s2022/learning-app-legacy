import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import * as Sentry from '@sentry/react';

import rootReducer from './modules';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk), sentryReduxEnhancer);
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
