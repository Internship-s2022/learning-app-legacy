import { SubmitHandler } from 'react-hook-form';

export interface StudentFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<StudentFilters>>;
}

export interface StudentFilters {
  student_user_postulant_firstName: string;
  student_user_postulant_lastName: string;
}
