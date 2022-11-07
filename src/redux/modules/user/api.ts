import { AxiosResponse } from 'axios';

import apiClient from 'src/config/api';

import { User } from './types';

const responseBody = (response: AxiosResponse) => response;

export const getUsersRequest = (query: string) =>
  apiClient.get<User[]>(`/user${query}`).then(responseBody);

export const createManualUserRequest = (data: User) =>
  apiClient.post<User>('/user/manual', data).then(responseBody);

export const deleteUserRequest = (id: string) =>
  apiClient.patch<User>(`/user/${id}`).then(responseBody);
