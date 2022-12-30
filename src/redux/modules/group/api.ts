import apiClient from 'src/config/api';
import { Group } from 'src/interfaces/entities/group';

import { Params } from '../types';

export const getGroupsRequest = (params: Params) =>
  apiClient.get<Group[]>(`/course/${params.id}/group${params.query}`);

export const createGroupRequest = (params: Params) =>
  apiClient.post<Group>(`/course/${params.id}/group`, params.data);

export const deleteGroupRequest = (params: Params, groupId: string) =>
  apiClient.delete<Group>(`/course/${params.id}/group/${groupId}`);
