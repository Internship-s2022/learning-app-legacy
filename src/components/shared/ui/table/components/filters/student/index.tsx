import React from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

import { InputText } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import { TableFilterProps } from '../types';
import styles from './student-filters.module.css';
import { StudentFilters } from './types';

const StudentTableFilters = ({
  onFiltersSubmit,
  isLoading,
}: Omit<TableFilterProps<StudentFilters>, 'filter'>) => {
  const { filterQuery } = useAppSelector((state: RootReducer) => state.report);
  const urlParams = new URLSearchParams(
    filterQuery.replace(/courseUser.user.postulant/g, ' courseUser_user_postulant_'),
  );
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<StudentFilters>({
    defaultValues: {
      courseUser_user_postulant_firstName: '',
      courseUser_user_postulant_lastName: '',
      ...objectFromParams,
    },
    mode: 'onSubmit',
    shouldUnregister: true,
  });

  return (
    <form
      data-testid="student-filter-container-form"
      className={styles.filtersContainer}
      onSubmit={handleSubmit(onFiltersSubmit)}
    >
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="courseUser_user_postulant_firstName"
          label="Nombre"
          variant="outlined"
          fullWidth={false}
          size="small"
          showError={false}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" disabled={isLoading}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="courseUser_user_postulant_lastName"
          label="Apellido"
          variant="outlined"
          fullWidth={false}
          size="small"
          showError={false}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" disabled={isLoading}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <input type="submit" hidden />
    </form>
  );
};

export default StudentTableFilters;
