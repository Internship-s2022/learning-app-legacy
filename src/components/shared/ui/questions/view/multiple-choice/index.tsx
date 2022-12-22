import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { ViewMultipleChoiceProps } from './types';

const ViewMultipleChoiceQuestion = ({ name, control, options }: ViewMultipleChoiceProps) => {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field }) => (
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
      )}
    />
  );
};

export default ViewMultipleChoiceQuestion;
