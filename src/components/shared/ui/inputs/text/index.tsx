import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import setInputBoxShadow from 'src/utils/styles';

import { InputTextProps } from './types';

const InputText = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  placeholderColor = '#eeeeee',
  fullWidth = true,
  showError = true,
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
      helperText={showError && (error?.message != undefined ? error?.message : ' ')}
      error={showError && error?.message != undefined}
      data-testid={`${name}-field`}
      inputProps={
        field.value
          ? { style: setInputBoxShadow(placeholderColor) }
          : { style: setInputBoxShadow('#00000000') }
      }
    />
  );
};

export default InputText;
