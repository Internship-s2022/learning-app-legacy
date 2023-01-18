import { Course } from './course';
import { CourseUser } from './course-user';
import { ModuleType } from './module';
import { User } from './user';

export type GroupTypes = 'DEV' | 'QA' | 'UX/UI' | 'GENERAL' | '';

export interface Group {
  _id: string;
  name: string;
  course: Course;
  tutor: User;
  type: GroupTypes;
  courseUsers: CourseUser[];
  modules?: ModuleType[];
  isActive: boolean;
}

export interface GroupForm {
  _id: string;
  name: string;
  course: Course;
  type: GroupTypes;
  courseUsers: CourseUser[];
  modules: string[];
  isActive: boolean;
}

export interface StudentGroupHistory
  extends Omit<Group, 'course' | 'module' | 'courseUsers' | 'modules' | 'tutor'> {
  course: string;
  module: {
    _id: string;
    name: string;
  };
  tutor: User;
}
