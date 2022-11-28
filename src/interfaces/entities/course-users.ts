import { User } from 'src/interfaces/entities/user';

import { Course, RoleType } from './course';

export interface CourseUser {
  course?: Course;
  user: User;
  role?: RoleType;
  isActive: boolean;
}
