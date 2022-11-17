import { SubmitHandler } from 'react-hook-form';

export interface AdmissionTestFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<AdmissionTestFilters>>;
}

export interface AdmissionTestFilters {
  name: string;
}
