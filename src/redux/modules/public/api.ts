import apiClient from 'src/config/api';
import { Course } from 'src/interfaces/entities/course';

import { Params } from '../types';

export const getPublicCourses = (params: Params) =>
  apiClient.get<Course[]>(`/public/course${params.query}`);
