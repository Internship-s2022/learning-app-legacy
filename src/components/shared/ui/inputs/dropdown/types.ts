import { UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
interface Option {
  label: string;
  value: string;
}

interface CustomProps {
  options: Option[];
  showError?: boolean;
}

type DropdownProps<TFormValues> = UseControllerProps<TFormValues> & TextFieldProps & CustomProps;

export default DropdownProps;
