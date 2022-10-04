import React, { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { FormControlLabel, FormHelperText, FormLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import styles from './checkbox.module.css';
import { CheckboxesProps } from './types';

export const Checkboxes = <TFormValues extends FieldValues>({
  control,
  options,
  name,
  title,
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
    <div className={styles.container}>
      <FormLabel error={error && true}>{title}</FormLabel>
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
    </div>
  );
};
