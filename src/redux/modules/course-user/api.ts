import apiClient from 'src/config/api';
import { CourseUser } from 'src/interfaces/entities/course-user';

import { Params } from '../types';

export const getUsersInCourseRequest = (params: Params) =>
  apiClient.get<CourseUser[]>(`/course-user/by-course/${params.id}${params.query}`);

export const disableByUserIdRequest = (params: Params<{ course: string; user: string }>) =>
  apiClient.patch<CourseUser>('/course-user', params.data);
