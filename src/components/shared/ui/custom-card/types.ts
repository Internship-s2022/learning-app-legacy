import { RoleType } from 'src/interfaces/entities/course-user';

export interface CustomCardProps {
  roleType: RoleType;
  courseName: string;
  courseId: string;
}
