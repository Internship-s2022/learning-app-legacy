import { SubmitHandler } from 'react-hook-form';

export interface GroupTableFilter {
  name: string;
  tutor_postulant_firstName: string;
  tutor_postulant_lastName: string;
}

export interface GroupFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<GroupTableFilter>>;
}
