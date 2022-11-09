import { SubmitHandler } from 'react-hook-form';

export interface CourseUserFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>>;
}

export interface CourseUserFilter {
  postulant_firstName: string;
  postulant_lastName: string;
  isActive: string;
}
