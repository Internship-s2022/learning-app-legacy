import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Course } from 'src/interfaces/entities/course';
import { CourseUser } from 'src/interfaces/entities/course-user';

export interface ConfirmProps {
  courseUsers: CourseUser[];
  controlAddCourse: Control<Course>;
  onSubmitAddCourse: (data: Course) => void;
  handleSubmitAddCourse: UseFormHandleSubmit<Course>;
}
