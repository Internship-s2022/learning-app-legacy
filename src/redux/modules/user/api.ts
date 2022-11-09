import apiClient from 'src/config/api';
import { User } from 'src/interfaces/entities/user';

import { Params } from '../types';

export const getUsersRequest = (params: Params) => apiClient.get<User[]>(`/user${params.query}`);

export const createManualUserRequest = (params: Params) => (
  console.log(params.data), apiClient.post<User>('/user/manual', params.data)
);

export const deleteUserRequest = (params: Params) => apiClient.patch<User>(`/user/${params.id}`);
