import axios, { AxiosError, AxiosResponse } from 'axios';

import { CustomError, CustomResponse } from 'src/interfaces/api';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<CustomResponse<unknown>>) => {
    const { data, ...restResponse } = response;
    if (data?.type === 'text/csv') {
      return response;
    } else {
      const formattedResponse = {
        ...data,
        ...restResponse,
        status: response?.status,
      };
      return formattedResponse;
    }
  },
  (error: AxiosError<CustomError>) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.warn(
        '-------- API RESPONSE ERROR --------',
        `\n${error}\n`,
        '\nData:',
        `${JSON.stringify(error?.response?.data)}\n`,
        '\nMessage:',
        `${error?.response?.data?.message}\n`,
        '\nStatus:',
        `${error?.response?.status}\n`,
        `\nURL: ${error?.request.responseURL}`,
      );
    }
    const { data, ...restError } = error.response;
    const formattederror = {
      ...data,
      ...restError,
    };
    return formattederror;
  },
);

export default apiClient;
