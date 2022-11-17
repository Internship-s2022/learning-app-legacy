import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Course, CourseUser } from 'src/interfaces/entities/course';

export interface ConfirmProps {
  courseUsers: CourseUser[];
  controlAddCourse: Control<Course>;
  onSubmitAddCourse: (data: Course) => void;
  handleSubmitAddCourse: UseFormHandleSubmit<Course>;
}
