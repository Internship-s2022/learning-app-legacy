import { Course } from './course';
import { CourseUser } from './course-user';
import { User } from './user';

export type GroupTypes = 'DEV' | 'QA' | 'UIUX' | 'GENERAL' | '';

export interface Group {
  _id: string;
  name: string;
  course: Course;
  type: GroupTypes;
  courseUsers: CourseUser[];
  modules: string[];
  isActive: boolean;
}

export interface StudentGroupHistory
  extends Omit<Group, 'course' | 'module' | 'courseUsers' | 'modules'> {
  course: string;
  module: {
    _id: string;
    name: string;
  };
  tutor: User;
}
