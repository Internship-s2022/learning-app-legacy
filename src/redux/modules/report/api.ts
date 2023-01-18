import apiClient from 'src/config/api';
import { GroupStudentReport, Report } from 'src/interfaces/entities/report';

import { Params } from '../types';

export const getReportsByCourseIdRequest = (params: Params) =>
  apiClient.get<GroupStudentReport[]>(
    `/course/${params.id}/report?student.isActive=true${params.query}`,
  );

export const getReportsByModuleIdRequest = (params: Params, moduleId: string) =>
  apiClient.get<Report[]>(
    `/course/${params.id}/report/module/${moduleId}?courseUser.role=STUDENT&courseUser.isActive=true${params.query}`,
  );

export const editReportByIdRequest = (params: Params) =>
  apiClient.patch<Report[]>(`/course/${params.id}/report`, params.data);
