import { Control, UseFormHandleSubmit, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { FormCourse } from 'src/interfaces/entities/course';

export interface AddCourseProps {
  controlAddCourse: Control<FormCourse>;
  handleSubmitAddCourse: UseFormHandleSubmit<FormCourse>;
  onSubmitAddCourse: (data: FormCourse) => void;
  watch: UseFormWatch<FormCourse>;
  setValue: UseFormSetValue<FormCourse>;
}
