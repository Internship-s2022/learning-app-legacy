import { Control, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Course } from 'src/interfaces/entities/course';

export interface AddCourseProps {
  controlAddCourse: Control<Course>;
  handleSubmitAddCourse: UseFormHandleSubmit<Course>;
  onSubmitAddCourse: (data: Course) => void;
  watch: UseFormWatch<Course>;
  setValue: UseFormSetValue<Course>;
}
