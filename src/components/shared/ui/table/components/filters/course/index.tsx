import React from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import styles from './course-filters.module.css';
import { CourseFilters, CourseFiltersProps } from './types';

const CourseTableFilters = ({ onFiltersSubmit }: CourseFiltersProps) => {
  const { filterQuery } = useAppSelector((state: RootReducer) => state.course);
  const urlParams = new URLSearchParams(filterQuery);
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<CourseFilters>({
    defaultValues: {
      name: '',
      status: '',
      isInternal: '',
      type: '',
      ...objectFromParams,
    },
    mode: 'onSubmit',
  });

  return (
    <form
      data-testid="course-Filter-container-form"
      className={styles.filtersContainer}
      onSubmit={handleSubmit(onFiltersSubmit)}
    >
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
            { value: 'SOON', label: 'Próximo' },
            { value: 'OPEN_INSCRIPTION', label: 'Inscripciones abiertas' },
            { value: 'IN_PROGRESS', label: 'En curso' },
            { value: 'COMPLETED', label: 'Completado' },
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
      <Box className={`${styles.dropdownContainer} ${styles.marginRight10}`}>
        <Dropdown
          options={[
            { value: '', label: 'Ninguno' },
            { value: 'EXPRESS', label: 'Express' },
            { value: 'FULL', label: 'Full' },
          ]}
          control={control}
          name="type"
          label="Duración"
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
