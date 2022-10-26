import { SubmitHandler } from 'react-hook-form';

export interface UserFilters {
  dni?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isInternal?: string;
}

export interface UserFiltersProps {
  onFiltersSubmit: SubmitHandler<UserFilters>;
}

export interface UserFiltersForm {
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  isInternal: string;
}
