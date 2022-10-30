import { Pagination } from '.';
export interface CustomResponse<T> {
  data: T;
  message: string;
  error: boolean;
  status: number;
  pagination?: Pagination;
  type?: string;
}

export interface CustomError {
  message: string;
  error: true;
  data: undefined;
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
