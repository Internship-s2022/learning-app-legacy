import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { Box, FormControlLabel, FormHelperText, FormLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import styles from './checkbox.module.css';
import { CheckboxesProps } from './types';

const Checkboxes = <TFormValues extends FieldValues>({
  control,
  options,
  name,
  label,
  ...props
}: CheckboxesProps<TFormValues>): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const [values, setValues] = useState(field.value);

  const handleOnChange = (e) => {
    const valueCopy = e.target.checked
      ? [...field.value, e.target.value]
      : values.filter((v) => e.target.value != v);

    field.onChange(valueCopy);

    setValues(valueCopy);
  };

  return (
    <Box className={styles.container}>
      <FormLabel error={error && true}>{label}</FormLabel>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              {...props}
              onChange={handleOnChange}
              value={option.value}
              name={option.value}
              checked={field.value?.includes(option.value)}
            />
          }
          label={option.label}
        />
      ))}
      <FormHelperText error={true}>
        {error?.message != undefined ? error?.message : ' '}
      </FormHelperText>
    </Box>
  );
};

export default Checkboxes;
