import { SubmitHandler } from 'react-hook-form';

export interface GroupFiltersProps {
  onFiltersSubmit: SubmitHandler<Partial<GroupFilter>>;
}

export interface GroupFilter {
  user_postulant_firstName: string;
  user_postulant_lastName: string;
}
