import * as React from 'react';
import { FieldValues, useController } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import styles from './autocomplete.module.css';
import { AutocompleteProps } from './types';

const AutocompleteInput = <Form extends FieldValues>(
  props: AutocompleteProps<Form>,
): JSX.Element => {
  const { control, name, options } = props;
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
            variant="filled"
            label="Contenidos"
            color="info"
          />
        )}
        onChange={(_, values) => {
          onChange(values);
        }}
        data-testid={'autocompleteTestId'}
      />
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
  );
};

export default AutocompleteInput;
