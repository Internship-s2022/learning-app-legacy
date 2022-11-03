import _ from 'lodash';
import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import DropdownProps from './types';

const Dropdown = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth = true,
  showError = true,
  options,
  onOptionClick = undefined,
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
      helperText={showError && (error?.message != undefined ? error?.message : ' ')}
      error={showError && error?.message != undefined}
      fullWidth={fullWidth}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          onClick={onOptionClick ? _.debounce(onOptionClick, 30) : undefined}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Dropdown;
