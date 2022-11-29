import { GeneralDataType } from '..';
import { Course, RoleType } from './course';
import { User } from './user';

export interface SelectedUsers {
  user: User;
  role?: RoleType;
  isActive: boolean;
}

export interface CourseUser extends SelectedUsers, GeneralDataType {
  course?: Course;
}

export interface CourseUserById {
  _id: string;
  course: Course;
  user: string;
  role: RoleType;
  isActive: boolean;
}
