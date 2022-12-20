import { Course } from './course';
import { CourseUser } from './course-user';
import { ModuleType } from './module';

export type GroupTypes = '' | 'DEV' | 'QA' | 'UIUX' | 'GENERAL';

export interface Group {
  _id?: string;
  name: string;
  course: Course | string;
  type: GroupTypes;
  courseUsers: CourseUser[];
  modules: ModuleType[] | string[];
  isActive: boolean;
}
