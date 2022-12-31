import React from 'react';
import { FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { ViewMultipleChoiceProps } from './types';

const ViewMultipleChoiceQuestion = <TFormValues extends FieldValues>({
  name,
  control,
  options,
}: ViewMultipleChoiceProps<TFormValues>) => {
  const { field } = useController({
    name,
    control,
    defaultValue: '' as PathValue<TFormValues, Path<TFormValues>>,
  });
  return (
    <FormControl>
      <RadioGroup {...field}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio />}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ViewMultipleChoiceQuestion;
