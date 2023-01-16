import { FieldValues, SubmitHandler } from 'react-hook-form';

export interface TableFilterProps<DataFiltersType extends FieldValues> {
  filter: string;
  onFiltersSubmit: SubmitHandler<DataFiltersType>;
  isLoading: boolean;
}
