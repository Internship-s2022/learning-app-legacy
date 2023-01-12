import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { InputAdornment } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import { containsSpecialChars } from 'src/utils/checks';

import styles from './autocomplete.module.css';
import { AutocompleteProps } from './types';

const AutocompleteInput = <Form extends FieldValues>(
  props: AutocompleteProps<Form>,
): JSX.Element => {
  const { control, name, options, onBlur } = props;
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleDelete = (chipToDelete: string) => {
    onChange(value?.filter((option) => option !== chipToDelete));
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        className={styles.autocomplete}
        multiple
        value={value}
        onBlur={onBlur}
        id="tags-filled"
        options={options?.map((option) => option)}
        freeSolo
        renderTags={() => null}
        defaultValue={value}
        renderInput={(params) => (
          <TextField
            {...params}
            helperText={error?.message || ' '}
            error={Boolean(error)}
            variant="outlined"
            label="Contenidos"
            color="info"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ControlPointIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
        onChange={(_, values, reason) => {
          if (values.some((value) => !value.trim())) return;
          if (values.some((value) => value.length < 2)) return;
          if (values.some((value) => value.length >= 50)) return;
          if (values.some((value) => containsSpecialChars(value))) return;
          if (reason !== 'removeOption') {
            onChange(values);
          }
        }}
        data-testid={'autocompleteTestId'}
      />
      <div className={styles.chipContainer}>
        {value?.map((option) => (
          <Chip
            key={option}
            color="primary"
            label={option}
            onDelete={() => handleDelete(option)}
            data-testid={option?.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default AutocompleteInput;
