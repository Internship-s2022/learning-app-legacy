import apiClient from 'src/config/api';
import { CourseUser, RoleType } from 'src/interfaces/entities/course-user';

import { Params } from '../types';

export const getUsersInCourseRequest = (params: Params) =>
  apiClient.get<CourseUser[]>(`/course-user/by-course/${params.id}${params.query}`);

export const getUsersWithoutGroupRequest = (params: Params) =>
  apiClient.get<CourseUser[]>(`/course-user/${params.id}/without-group${params.query}`);

export const disableByUserIdRequest = (params: Params<{ course: string; user: string }>) =>
  apiClient.patch<CourseUser>('/course-user', params.data);

export const addCourseUsersRequest = (
  params: Params<{ course: string; user: string; role: RoleType; isActive: boolean }>,
) => apiClient.post<CourseUser>('/course-user', params.data);
