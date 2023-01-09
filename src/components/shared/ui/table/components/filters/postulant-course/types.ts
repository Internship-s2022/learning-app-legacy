import { SubmitHandler } from 'react-hook-form';

export interface PostulantCourseFilterProps {
  onFiltersSubmit: SubmitHandler<Partial<PostulantCourseFilter>>;
}

export interface PostulantCourseFilter {
  postulant_firstName: string;
  postulant_lastName: string;
  postulant_age_min: number | '';
  postulant_age_max: number | '';
  view: string;
  postulant_country: string;
}
