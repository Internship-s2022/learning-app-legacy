import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { CustomTableFiltersProps, TableFiltersForm } from '../../types';
import styles from './table-filters.module.css';

const CustomTableFilters = ({ filters, onFiltersSubmit }: CustomTableFiltersProps) => {
  const { handleSubmit, control, reset } = useForm<TableFiltersForm>({
    defaultValues: {
      id: '',
      name: '',
      status: '',
    },
    mode: 'onSubmit',
  });

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit(onFiltersSubmit)}>
      {filters.map((filter, index) =>
        filter == 'status' ? (
          <Box className={`${styles.dropdownContainer} ${styles.marginRight10}`} key={index}>
            <Dropdown
              options={[
                { value: '', label: 'Ninguno' },
                { value: 'admin', label: 'Administrador' },
                { value: 'tutor', label: 'Tutor' },
                { value: 'student', label: 'Estudiante' },
                { value: 'postulant', label: 'Postulante' },
              ]}
              control={control}
              name={filter}
              label={capitalizeFirstLetter(filter)}
              variant="outlined"
              showError={false}
              size="small"
              placeholder="Status"
            />
          </Box>
        ) : (
          <Box className={styles.marginRight10} key={index}>
            <InputText
              key={index}
              control={control}
              name={filter}
              label={capitalizeFirstLetter(filter)}
              variant="outlined"
              fullWidth={false}
              size="small"
              showError={false}
            />
          </Box>
        ),
      )}
      <Box className={styles.marginRight10}>
        <Button type="submit" variant="contained">
          Filter
        </Button>
      </Box>
      <Button onClick={() => reset()} variant="outlined">
        Reset
      </Button>
    </form>
  );
};

export default CustomTableFilters;
