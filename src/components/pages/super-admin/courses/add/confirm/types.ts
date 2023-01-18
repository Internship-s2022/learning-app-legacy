import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { FormCourse } from 'src/interfaces/entities/course';
import { CourseUser } from 'src/interfaces/entities/course-user';

export interface ConfirmProps {
  courseUsers: CourseUser[];
  controlAddCourse: Control<FormCourse>;
  onSubmitAddCourse: (data: FormCourse) => void;
  handleSubmitAddCourse: UseFormHandleSubmit<FormCourse>;
}
