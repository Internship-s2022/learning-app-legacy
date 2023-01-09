import { FieldValues, UseControllerProps } from 'react-hook-form';

export type DatePickerProps<Form extends FieldValues> = {
  label?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
  maxDate?: Date;
} & UseControllerProps<Form>;
