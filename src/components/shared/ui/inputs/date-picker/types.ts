import { FieldValues, UseControllerProps } from 'react-hook-form';
import { DatePickerProps } from '@mui/x-date-pickers';

export type CustomDatePickerProps<Form extends FieldValues> = {
  label?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  fixedValue?: Date | string;
  readonly?: boolean;
  onChange?: (e: any) => void;
} & UseControllerProps<Form> &
  Omit<DatePickerProps<Date, Date>, 'onChange' | 'renderInput' | 'value'>;
