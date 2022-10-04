import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import { InputTextProps } from './types';

const InputText = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth = true,
  ...props
}: InputTextProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <TextField
      {...field}
      {...props}
      fullWidth={fullWidth}
      helperText={error?.message != undefined ? error?.message : ' '}
      error={error?.message != undefined}
    />
  );
};

export default InputText;
