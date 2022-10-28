import { SubmitHandler } from 'react-hook-form';

export interface UserFilters {
  postulant_dni?: string;
  postulant_email?: string;
  postulant_firstName?: string;
  postulant_lastName?: string;
  isInternal?: string;
}

export interface UserFiltersProps {
  onFiltersSubmit: SubmitHandler<UserFilters>;
}

export interface UserFiltersForm {
  postulant_dni: string;
  postulant_email: string;
  postulant_firstName: string;
  postulant_lastName: string;
  isInternal: string;
}
