import { SubmitHandler } from 'react-hook-form';

export interface CourseFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<CourseFilters>>;
}

export interface CourseFilters {
  name: string;
  isActive: string;
  isInternal: string;
}
