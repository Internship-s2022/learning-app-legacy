import { UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';

export type OptionInputTextProps<TFormValues> = UseControllerProps<TFormValues> &
  TextFieldProps & {
    showError?: boolean;
    placeholderColor?: string;
    onCloseClick: () => void;
    startIcon: JSX.Element;
  };
