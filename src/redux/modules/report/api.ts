import apiClient from 'src/config/api';
import { Report } from 'src/interfaces/entities/report';

import { Params } from '../types';

export const getReportsByCourseIdRequest = (params: Params) =>
  apiClient.get<Report[]>(`/course/${params.id}/report?courseUser.isActive=true${params.query}`);

export const getReportsByModuleIdRequest = (params: Params) =>
  apiClient.get<Report[]>(`/course/${params.id}/report/module/${params.query}`);
