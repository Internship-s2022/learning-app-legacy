import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { User } from 'src/redux/modules/user/types';

import { CourseTypes, CourseUser, RoleType } from '../types';

export interface ConfirmProps {
  courseUsers: CourseUser[];
  controlAddCourse: Control<CourseTypes>;
  onSubmitAddCourse: (data: CourseTypes) => void;
  handleSubmitAddCourse: UseFormHandleSubmit<CourseTypes>;
}

export interface CourseUserType extends User {
  role?: RoleType;
}
