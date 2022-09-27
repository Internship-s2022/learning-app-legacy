import { UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

export type InputTextProps<TFormValues> = UseControllerProps<TFormValues> & TextFieldProps;
