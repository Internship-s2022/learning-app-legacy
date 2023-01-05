import React from 'react';
import { FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import styles from '../../view.module.css';
import { errorStyles } from '../constants';
import { ViewMultipleChoiceProps } from './types';

const ViewMultipleChoiceQuestion = <TFormValues extends FieldValues>({
  name,
  control,
  options,
  rules,
}: ViewMultipleChoiceProps<TFormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '' as PathValue<TFormValues, Path<TFormValues>>,
    rules,
  });
  return (
    <>
      <FormControl>
        <RadioGroup {...field}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              label={option.label}
              control={<Radio sx={error?.message != undefined ? errorStyles : undefined} />}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Text color="error" variant="body2" className={styles.errorText}>
        {error?.message != undefined ? error?.message : '\u00A0'}
      </Text>
    </>
  );
};

export default ViewMultipleChoiceQuestion;
