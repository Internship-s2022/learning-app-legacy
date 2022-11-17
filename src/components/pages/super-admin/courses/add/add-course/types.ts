import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { Course } from 'src/interfaces/entities/course';

export interface AddCourseProps {
  controlAddCourse: Control<Course>;
  handleSubmitAddCourse: UseFormHandleSubmit<Course>;
  onSubmitAddCourse: (data: Course) => void;
}
