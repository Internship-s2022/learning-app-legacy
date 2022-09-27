import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';

import styles from './text.module.css';
import { InputTextProps } from './types';

const InputText = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  ...props
}: InputTextProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <div className={styles.container}>
      <TextField
        {...field}
        {...props}
        helperText={error?.message}
        error={error?.message ? true : false}
      />
    </div>
  );
};

export default InputText;
