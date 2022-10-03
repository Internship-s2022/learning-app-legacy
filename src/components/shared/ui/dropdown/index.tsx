import * as React from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

interface Option {
  label: string;
  value: string;
}

interface CustomProps {
  options: Option[];
}

type DropdownProps<TFormValues> = UseControllerProps<TFormValues> & TextFieldProps & CustomProps;

const Dropdown = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  options,
  ...props
}: DropdownProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });
  return (
    <div>
      <TextField
        {...props}
        {...field}
        id="outlined-select-currency"
        select
        helperText={error?.message != undefined ? error?.message : ' '}
        error={error?.message != undefined}
        fullWidth={true}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default Dropdown;
