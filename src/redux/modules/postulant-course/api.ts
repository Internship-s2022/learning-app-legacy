import apiClient from 'src/config/api';
import { PostulantCourse } from 'src/interfaces/entities/postulant-course';

import { Params } from '../types';
import { PromotionResponse } from './types';

export const getCorrectedPostulantsRequest = (params: Params) =>
  apiClient.get<PostulantCourse[]>(
    `course/${params.id}/postulation?corrected=true&${params.query}`,
  );

export const getNotCorrectedPostulantsRequest = (params: Params) =>
  apiClient.get<PostulantCourse[]>(
    `course/${params.id}/postulation?corrected=false&${params.query}`,
  );

export const promotePostulantsRequest = (params: Params) =>
  apiClient.post<PromotionResponse>(`course/${params.id}/postulation/promote`, params.data);

export const correctTestsRequest = (params: Params) =>
  apiClient.post<PostulantCourse[]>(
    `course/${params.id}/postulation/admission-test${params.query}`,
    params.data,
  );
