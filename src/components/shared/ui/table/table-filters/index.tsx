import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';

import Dropdown from 'src/components/shared/ui/inputs/dropdown';
import InputText from 'src/components/shared/ui/inputs/text';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import { CustomTableFiltersProps, TableFiltersForm } from '../types';
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
          <Box sx={{ mr: 1, width: '25ch' }} key={index}>
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
          <InputText
            sx={{ mr: 1 }}
            key={index}
            control={control}
            name={filter}
            label={capitalizeFirstLetter(filter)}
            variant="outlined"
            fullWidth={false}
            size="small"
            showError={false}
          />
        ),
      )}
      <Button sx={{ mr: 1 }} type="submit" variant="contained">
        Filter
      </Button>
      <Button sx={{ mr: 1 }} onClick={() => reset()} variant="outlined">
        Reset
      </Button>
    </form>
  );
};

export default CustomTableFilters;
