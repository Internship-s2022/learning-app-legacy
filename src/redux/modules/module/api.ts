import apiClient from 'src/config/api';
import { ModuleType } from 'src/interfaces/entities/module';

import { Params } from '../types';

export const getModulesRequest = (params: Params) =>
  apiClient.get<ModuleType[]>(`/course/${params.id}/module?isActive=true${params.query}`);

export const getModuleByIdRequest = (params: Params, moduleId: string) =>
  apiClient.get<ModuleType>(`/course/${params.id}/module/${moduleId}`);

export const disableModuleRequest = (params: Params, moduleId: string) =>
  apiClient.patch<ModuleType>(`/course/${params.id}/module/${moduleId}`);

export const createModuleRequest = (params: Params) =>
  apiClient.post<ModuleType>(`/course/${params.id}/module`, params.data);

export const editModuleRequest = (params: Params, moduleId: string) =>
  apiClient.put<ModuleType>(`/course/${params.id}/module/${moduleId}`, params.data);
