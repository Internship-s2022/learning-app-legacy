import axios, { AxiosError, AxiosResponse } from 'axios';
import firebase from 'firebase/compat/app';

import { ApiErrorMessages, StatusCodes } from 'src/constants/api';
import { HomeRoutes, UserRoutes } from 'src/constants/routes';
import { CustomError, CustomResponse } from 'src/interfaces/api';
import { router } from 'src/routes';

import firebaseApp from './firebase';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse<CustomResponse<unknown>>) => {
    const { data, ...restResponse } = response;
    if (data instanceof Blob || data?.type === 'text/csv') {
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
  async (error: AxiosError<CustomError<{ type?: string }>>) => {
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
    if (error.response?.status === StatusCodes.FORBIDDEN) {
      router.navigate(UserRoutes.main.route);
    }
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      if (error.response?.data?.data?.type === ApiErrorMessages.TOKEN_EXPIRED) {
        const { config } = error;
        const user: firebase.User = firebaseApp.auth().currentUser;
        if (user) {
          const token = await user.getIdToken(true);
          config.headers['token'] = token;
          return new Promise((resolve, reject) => {
            apiClient.request(config).then(resolve).catch(reject);
          });
        }
      } else {
        router.navigate(HomeRoutes.login.route);
      }
    }
    const { data, ...restError } = error.response;
    const formattedError = {
      ...data,
      ...restError,
    };
    return formattedError;
  },
);

export default apiClient;
