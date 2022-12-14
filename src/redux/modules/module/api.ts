import apiClient from 'src/config/api';
import { ModuleType } from 'src/interfaces/entities/module';

import { Params } from '../types';

export const getModulesRequest = (params: Params) =>
  apiClient.get<ModuleType[]>(`/course/${params.id}/module`);
