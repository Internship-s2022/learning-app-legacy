import { SubmitHandler } from 'react-hook-form';

export interface TableFilterProps<DataFiltersType> {
  filter: string;
  onFiltersSubmit: SubmitHandler<DataFiltersType>;
}
