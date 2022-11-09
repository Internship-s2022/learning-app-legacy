import { Control, UseFormHandleSubmit } from 'react-hook-form';

import { CourseTypes } from '../types';

export interface AddCourseProps {
  controlAddCourse: Control<CourseTypes>;
  handleSubmitAddCourse: UseFormHandleSubmit<CourseTypes>;
  onSubmitAddCourse: (data: CourseTypes) => void;
}
