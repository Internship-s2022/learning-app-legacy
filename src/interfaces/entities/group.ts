import { Course } from './course';
import { CourseUser } from './course-user';

export type GroupTypes = '' | 'DEV' | 'QA' | 'UIUX' | 'GENERAL';

export interface Group {
  _id?: string;
  name: string;
  course: Course;
  type: GroupTypes;
  courseUsers: CourseUser[];
  modules: string[];
  isActive: boolean;
}
