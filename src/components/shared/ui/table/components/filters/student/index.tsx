import React from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

import { InputText } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import styles from './student-filters.module.css';
import { StudentFilters, StudentFiltersProps } from './types';

const StudentTableFilters = ({ onFiltersSubmit }: StudentFiltersProps) => {
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
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
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
          InputProps={{
            endAdornment: (
              <IconButton type="submit">
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
