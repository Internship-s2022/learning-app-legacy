import _ from 'lodash';
import React, { useMemo } from 'react';
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
  rules,
  ...props
}: DropdownProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules });

  const sortedOptions = useMemo(() => {
    const emptyValue = options.find((option) => option.value === '');
    if (emptyValue) {
      return [
        emptyValue,
        ...options
          .filter(({ value }) => value !== '')
          .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0)),
      ];
    }
    return [...options.sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0))];
  }, [options]);

  return (
    <TextField
      data-testid={`${name}-container`}
      {...props}
      {...field}
      select
      helperText={showError && (error?.message != undefined ? error?.message : ' ')}
      error={showError && error?.message != undefined}
      fullWidth={fullWidth}
    >
      {sortedOptions.map((option) => (
        <MenuItem
          data-testid={`dropdown-option-${option.value}`}
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
