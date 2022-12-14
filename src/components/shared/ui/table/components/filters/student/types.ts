import { SubmitHandler } from 'react-hook-form';

export interface StudentFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<StudentFilters>>;
}

export interface StudentFilters {
  courseUser_user_postulant_firstName: string;
  courseUser_user_postulant_lastName: string;
}
