import { UseControllerProps } from 'react-hook-form';
import { CheckboxProps } from '@mui/material';

interface Options {
  label: string;
  value: string;
}

interface CustomProps {
  label: string;
  options: Options[];
}

export type CheckboxesProps<TFormValues> = UseControllerProps<TFormValues> &
  CheckboxProps &
  CustomProps;
