import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import { roleOptions } from 'src/constants/dropdown-options';
import { RootReducer } from 'src/redux/modules/types';

import { TableFilterProps } from '../types';
import styles from './admin-course-user-filters.module.css';
import { CourseUserFilter } from './types';

const AdminCourseUserTableFilters = ({
  onFiltersSubmit,
  isLoading,
}: Omit<TableFilterProps<CourseUserFilter>, 'filter'>) => {
  const { filterQuery } = useSelector((state: RootReducer) => state.user);
  const urlParams = new URLSearchParams(filterQuery.replace(/.postulant./g, 'postulant_'));
  const objectFromParams = Object.fromEntries(urlParams);
  const { handleSubmit, control } = useForm<CourseUserFilter>({
    defaultValues: {
      user_postulant_firstName: '',
      user_postulant_lastName: '',
      role: '',
      ...objectFromParams,
    },
    mode: 'onSubmit',
  });

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit(onFiltersSubmit)}>
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="user_postulant_firstName"
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
          name="user_postulant_lastName"
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
      <Box className={`${styles.marginRight10} ${styles.dropdownContainer}`}>
        <Dropdown
          control={control}
          name="role"
          label="Rol"
          options={roleOptions}
          variant="outlined"
          showError={false}
          size="small"
          disabled={isLoading}
          onOptionClick={() => {
            handleSubmit(onFiltersSubmit)();
          }}
        />
      </Box>
      <input type="submit" hidden />
    </form>
  );
};

export default AdminCourseUserTableFilters;
