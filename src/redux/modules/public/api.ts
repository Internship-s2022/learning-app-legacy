import apiClient from 'src/config/api';
import { Course } from 'src/interfaces/entities/course';

import { Params } from '../types';
import {
  PostulationParams,
  PostulationType,
  PublicRegistrationFormParams,
  PublicRegistrationFormType,
} from './types';

export const getPublicCourses = (params: Params) =>
  apiClient.get<Course[]>(`/public/course${params.query}`);

export const getPublicRegistrationForm = (params: PublicRegistrationFormParams) =>
  apiClient.get<PublicRegistrationFormType>(
    `/public/course/${params.courseId}/registration-form?view=${params.viewId}${params.query}`,
  );

export const createPostulation = (params: PostulationParams) =>
  apiClient.post<PostulationType>(`/public/course/${params.courseId}/postulation`, params.data);
