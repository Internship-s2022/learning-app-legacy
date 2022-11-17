import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

import styles from './password.module.css';
import { InputPasswordProps } from './types';

const InputPassword = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  fullWidth = true,
  showError = true,
  ...props
}: InputPasswordProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });
  const [isVisible, setIsVisible] = useState(false);

  const alternateVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <TextField
      {...field}
      {...props}
      type={isVisible ? 'text' : 'password'}
      fullWidth={fullWidth}
      helperText={showError && (error?.message != undefined ? error?.message : ' ')}
      error={showError && error?.message != undefined}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment
            position="start"
            onClick={alternateVisibility}
            className={styles.iconButton}
          >
            {isVisible ? <VisibilityOff /> : <Visibility />}
          </InputAdornment>
        ),
      }}
      data-testid={`${name}-field`}
    />
  );
};

export default InputPassword;
