import React from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { InputText } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import styles from './admission-test-filters.module.css';
import { AdmissionTestFilters, AdmissionTestFiltersProps } from './types';

const AdmissionTestTableFilters = ({ onFiltersSubmit }: AdmissionTestFiltersProps) => {
  const { filterQuery } = useAppSelector((state: RootReducer) => state.course);
  const urlParams = new URLSearchParams(filterQuery);
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<AdmissionTestFilters>({
    defaultValues: {
      name: '',
      ...objectFromParams,
    },
    mode: 'onSubmit',
  });

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit(onFiltersSubmit)}>
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="name"
          label="Buscar test de admisión"
          variant="outlined"
          fullWidth={false}
          size="small"
          showError={false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <input type="submit" hidden />
    </form>
  );
};

export default AdmissionTestTableFilters;
