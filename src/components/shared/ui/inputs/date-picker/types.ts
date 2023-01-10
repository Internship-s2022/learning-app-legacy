import { FieldValues, UseControllerProps } from 'react-hook-form';
import { DatePickerProps } from '@mui/x-date-pickers';

export type CustomDatePickerProps<Form extends FieldValues> = {
  label?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  readonly?: boolean;
} & UseControllerProps<Form> &
  Omit<DatePickerProps<Date, Date>, 'onChange' | 'renderInput' | 'value'>;
