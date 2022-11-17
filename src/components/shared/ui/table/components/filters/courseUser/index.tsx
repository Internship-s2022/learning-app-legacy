import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { InputText } from 'src/components/shared/ui';
import { RootReducer } from 'src/redux/modules/types';

import { CourseUserFilter, CourseUserFiltersProps } from './types';
import styles from './user-filters.module.css';

const CourseUserTableFilters = ({ onFiltersSubmit }: CourseUserFiltersProps) => {
  const { filterQuery } = useSelector((state: RootReducer) => state.user);
  const urlParams = new URLSearchParams(filterQuery.replace(/postulant./g, 'postulant_'));
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<CourseUserFilter>({
    defaultValues: {
      postulant_firstName: '',
      postulant_lastName: '',
      isActive: '',
      ...objectFromParams,
    },
    mode: 'onChange',
  });

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit(onFiltersSubmit)}>
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="postulant_firstName"
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
      <input type="submit" hidden />
    </form>
  );
};

export default CourseUserTableFilters;
