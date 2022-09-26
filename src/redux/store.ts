import { combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { counterReducer } from './modules/user/reducer';

const rootReducer = combineReducers({ counter: counterReducer });

const configureStore = () => {
  const enhancer = composeWithDevTools();
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;

export type RootState = ReturnType<typeof rootReducer>;
