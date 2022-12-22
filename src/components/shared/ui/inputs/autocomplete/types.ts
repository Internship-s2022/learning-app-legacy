import { FieldValues, UseControllerProps } from 'react-hook-form';
interface CustomProps {
  options?: string[];
  isMultiple?: boolean;
  isFreeSolo?: boolean;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

export type AutocompleteProps<Form extends FieldValues> = UseControllerProps<Form> & CustomProps;
