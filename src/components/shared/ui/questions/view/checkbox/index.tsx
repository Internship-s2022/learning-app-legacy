import React from 'react';
import { Controller, useController } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

import { ViewCheckboxQuestionProps } from './types';

const ViewCheckboxQuestion = ({ name, control, options }: ViewCheckboxQuestionProps) => {
  const {
    field: { value },
  } = useController({
    name,
    control,
  });

  const handleCheck = (checkedId) => {
    const newIds = value?.includes(checkedId)
      ? value?.filter((id) => id !== checkedId)
      : [...(value ?? []), checkedId];
    return newIds;
  };

  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field }) => (
        <FormControl>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              control={<Checkbox onChange={() => field.onChange(handleCheck(option.value))} />}
            />
          ))}
        </FormControl>
      )}
    />
  );
};

export default ViewCheckboxQuestion;
