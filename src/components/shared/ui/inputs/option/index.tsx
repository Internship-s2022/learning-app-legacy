import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, TextField } from '@mui/material';

import setInputBoxShadow from 'src/utils/styles';

import styles from './option.module.css';
import { OptionInputTextProps } from './types';

const OptionInputText = <TFormValues extends FieldValues>({
  name,
  control,
  defaultValue,
  onCloseClick,
  placeholderColor = '#fff',
  showError = true,
  startIcon,
  ...props
}: OptionInputTextProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });
  return (
    <Box className={styles.optionContainer}>
      <Box className={styles.startIconContainer}>{startIcon}</Box>
      <TextField
        {...field}
        {...props}
        fullWidth={true}
        helperText={showError && (error?.message != undefined ? error?.message : ' ')}
        error={showError && error?.message != undefined}
        data-testid={`${name}-field`}
        inputProps={{ style: setInputBoxShadow(placeholderColor) }}
        sx={{ '& label': { zIndex: 1 } }}
        variant="standard"
      />
      <IconButton aria-label="delete" onClick={onCloseClick}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default OptionInputText;
