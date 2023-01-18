import apiClient from 'src/config/api';
import { Course } from 'src/interfaces/entities/course';

import { Params } from '../types';

export const getCoursesRequest = (params: Params) =>
  apiClient.get<Course[]>(`/course${params.query}`);

export const getCourseByIdRequest = (params: Params) =>
  apiClient.get<Course>(`/course/${params.id}`);

export const createCourseRequest = (params: Params) =>
  apiClient.post<Course>('/course', params.data);

export const deleteCourseRequest = (params: Params) =>
  apiClient.patch<Course>(`/course/${params.id}`);

export const editCourseRequest = (params: Params) =>
  apiClient.put<Course>(`/course/${params.id}`, params.data);
