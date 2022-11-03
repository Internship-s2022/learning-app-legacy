import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import { RootReducer } from 'src/redux/modules/types';

import styles from './course-filters.module.css';
import { CourseFilters, CourseFiltersProps } from './types';

const CourseTableFilters = ({ onFiltersSubmit }: CourseFiltersProps) => {
  const { filterQuery } = useSelector((state: RootReducer) => state.course);
  const urlParams = new URLSearchParams(filterQuery);
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<CourseFilters>({
    defaultValues: {
      name: '',
      status: '',
      isInternal: '',
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
          label="Nombre"
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
      <Box className={`${styles.dropdownContainer} ${styles.marginRight10}`}>
        <Dropdown
          options={[
            { value: '', label: 'Ninguno' },
            { value: 'Próximo', label: 'Próximo' },
            { value: 'En curso', label: 'En curso' },
            { value: 'Completado', label: 'Completado' },
          ]}
          control={control}
          name="status"
          label="Estado"
          variant="outlined"
          showError={false}
          size="small"
          onOptionClick={() => {
            handleSubmit(onFiltersSubmit)();
          }}
        />
      </Box>
      <Box className={`${styles.dropdownContainer} ${styles.marginRight10}`}>
        <Dropdown
          options={[
            { value: '', label: 'Ninguno' },
            { value: 'true', label: 'Interno' },
            { value: 'false', label: 'Externo' },
          ]}
          control={control}
          name="isInternal"
          label="Tipo"
          variant="outlined"
          showError={false}
          size="small"
          onOptionClick={() => {
            handleSubmit(onFiltersSubmit)();
          }}
        />
      </Box>
      <input type="submit" hidden />
    </form>
  );
};

export default CourseTableFilters;
