import { GeneralDataType } from '..';
import { RoleType } from './course';
import { User } from './user';

export interface SelectedUsers {
  user: User;
  role?: RoleType;
  isActive: boolean;
}

export interface CourseUser extends SelectedUsers, GeneralDataType {
  course?: string;
}
