import { SubmitHandler } from 'react-hook-form';

export interface UserFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<UserFilters>>;
}

export interface UserFilters {
  postulant_dni: string;
  postulant_email: string;
  postulant_firstName: string;
  postulant_lastName: string;
  isInternal: string;
}
