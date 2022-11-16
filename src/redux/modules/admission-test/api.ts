import apiClient from 'src/config/api';
import { AdmissionTest } from 'src/interfaces/entities/admission-test';

import { Params } from '../types';

export const getAdmissionTestRequest = (params: Params) =>
  apiClient.get<AdmissionTest[]>(`/admission-test${params.query}`);

export const createAdmissionTestRequest = (params: Params) =>
  apiClient.post<AdmissionTest>('/admission-test', params.data);

export const deleteAdmissionTestRequest = (params: Params) =>
  apiClient.patch<AdmissionTest>(`/admission-test/${params.id}`);

export const editAdmissionTestRequest = (params: Params) =>
  apiClient.put<AdmissionTest>(`/admission-test/${params.id}`, params.data);
