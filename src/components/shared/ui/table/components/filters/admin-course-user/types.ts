import { SubmitHandler } from 'react-hook-form';

export interface CourseUserFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>>;
}

export interface CourseUserFilter {
  user_postulant_firstName: string;
  user_postulant_lastName: string;
  role?: string;
}
