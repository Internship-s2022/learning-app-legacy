import React from 'react';
import { FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

import { ViewCheckboxQuestionProps } from './types';

const ViewCheckboxQuestion = <TFormValues extends FieldValues>({
  name,
  control,
  options,
}: ViewCheckboxQuestionProps<TFormValues>) => {
  const { field } = useController({
    name,
    control,
    defaultValue: '' as PathValue<TFormValues, Path<TFormValues>>,
  });

  const handleCheck = (checkedId: string) => {
    const newIds = field.value?.includes(checkedId)
      ? field.value?.filter((id: string) => id !== checkedId)
      : [...(field.value ?? []), checkedId];
    return newIds;
  };

  return (
    <FormControl>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          label={option.label}
          control={<Checkbox onChange={() => field.onChange(handleCheck(option.value))} />}
        />
      ))}
    </FormControl>
  );
};

export default ViewCheckboxQuestion;
