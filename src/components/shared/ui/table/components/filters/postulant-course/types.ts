export interface PostulantCourseFilter {
  postulant_firstName: string;
  postulant_lastName: string;
  postulant_age_min: number | '';
  postulant_age_max: number | '';
  view: string;
  postulant_country: string;
}
