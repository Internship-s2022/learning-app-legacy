import { SubmitHandler } from 'react-hook-form';

type Filter = 'dni' | 'mail' | 'name' | 'type';

export interface UserFilters {
  dni?: string;
  email?: string;
  name?: string;
  isInternal?: string;
}

export interface UserFiltersProps {
  onFiltersSubmit: SubmitHandler<UserFilters>;
}

export interface UserFiltersForm {
  dni: string;
  email: string;
  name: string;
  isInternal: string;
}
