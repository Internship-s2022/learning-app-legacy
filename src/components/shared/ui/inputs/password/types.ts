import { UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

export type InputPasswordProps<TFormValues> = UseControllerProps<TFormValues> &
  TextFieldProps &
  Omit<TextFieldProps, 'type'> & { showError?: boolean };
