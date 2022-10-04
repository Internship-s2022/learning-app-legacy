import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import DropdownProps from './types';

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
    <TextField
      {...props}
      {...field}
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
  );
};

export default Dropdown;
