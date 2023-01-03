import React from 'react';
import { FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import styles from '../../view.module.css';
import { errorStyles } from '../constants';
import { ViewCheckboxQuestionProps } from './types';

const ViewCheckboxQuestion = <TFormValues extends FieldValues>({
  name,
  control,
  options,
  rules,
}: ViewCheckboxQuestionProps<TFormValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '' as PathValue<TFormValues, Path<TFormValues>>,
    rules,
  });

  const handleCheck = (checkedId: string) => {
    const newIds = field.value?.includes(checkedId)
      ? field.value?.filter((id: string) => id !== checkedId)
      : [...(field.value ?? []), checkedId];
    return newIds;
  };

  return (
    <>
      <FormControl>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            control={
              <Checkbox
                sx={error?.message != undefined ? errorStyles : undefined}
                onChange={() => field.onChange(handleCheck(option.value))}
              />
            }
          />
        ))}
      </FormControl>
      <Text color="error" variant="body2" className={styles.errorText}>
        {error?.message != undefined ? error?.message : '\u00A0'}
      </Text>
    </>
  );
};

export default ViewCheckboxQuestion;
