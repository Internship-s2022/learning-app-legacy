import React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { CustomDatePickerProps } from './types';

const DatePickerInput = <TValuesForm extends FieldValues>({
  name,
  control,
  defaultValue,
  ...props
}: CustomDatePickerProps<TValuesForm>): JSX.Element => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const { label, className, disabled, maxDate, minDate, readonly } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={onChange}
        value={value}
        label={label}
        className={className}
        disabled={disabled}
        maxDate={maxDate}
        minDate={minDate}
        readOnly={readonly}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            color="primary"
            data-testid={`${name}-field`}
            onBlur={onBlur}
            error={error?.message != undefined}
            helperText={error?.message != undefined ? error.message : ' '}
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
          />
        )}
        inputFormat={'dd/MM/yyyy'}
      />
    </LocalizationProvider>
  );
};

export default DatePickerInput;
