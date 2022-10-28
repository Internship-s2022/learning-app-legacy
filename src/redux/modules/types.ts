import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { Pagination } from 'src/interfaces';

import { authTypes } from './auth';
import { uiTypes } from './ui';
import { userTypes } from './user';

export interface RootReducer {
  user: userTypes.State;
  ui: uiTypes.uiState;
  auth: authTypes.State;
}

export interface ErrorResponse {
  message: string;
  error: boolean;
  status: number;
  statusText: string;
  headers?: ErrorHeaders;
  config?: Config;
  request?: Request;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: ConfigHeaders;
  baseURL: string;
  method: string;
  url: string;
}

export interface Env {
  FormData: null;
}

export interface ConfigHeaders {
  Accept: string;
  token: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface ErrorHeaders {
  'content-length': string;
  'content-type': string;
}

export interface AsyncState {
  isLoading: boolean;
  errorData: ErrorResponse;
  pagination?: Pagination;
}

export type RootAction = userTypes.ActionsType | uiTypes.ActionsType | authTypes.ActionsType;

export type ApiResponse<T> = { message: string; data: T; error: boolean };

export type AppThunk = ActionCreator<ThunkAction<void, RootReducer, null, Action<null>>>;
