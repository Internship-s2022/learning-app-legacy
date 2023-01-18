import { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers';

export type CustomDatePickerProps<Form extends FieldValues> = {
  label?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  readonly?: boolean;
  size?: TextFieldProps['size'];
} & UseControllerProps<Form> &
  Omit<DatePickerProps<Date, Date>, 'onChange' | 'renderInput' | 'value'>;
