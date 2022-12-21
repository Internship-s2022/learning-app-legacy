import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { ViewCheckboxQuestionProps } from './types';

const ViewCheckboxQuestion = ({ name, control, options }: ViewCheckboxQuestionProps) => {
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

export default ViewCheckboxQuestion;
