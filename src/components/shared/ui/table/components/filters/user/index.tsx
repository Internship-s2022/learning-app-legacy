import React from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

import { UserFilters, UserFiltersProps } from './types';
import styles from './user-filters.module.css';

const UserTableFilters = ({ onFiltersSubmit }: UserFiltersProps) => {
  const { filterQuery } = useAppSelector((state: RootReducer) => state.user);
  const urlParams = new URLSearchParams(filterQuery.replace(/postulant./g, 'postulant_'));
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<UserFilters>({
    defaultValues: {
      postulant_dni: '',
      postulant_email: '',
      postulant_firstName: '',
      postulant_lastName: '',
      isInternal: '',
      ...objectFromParams,
    },
    mode: 'onSubmit',
  });

  return (
    <form
      data-testid="userFilter-container-form"
      className={styles.filtersContainer}
      onSubmit={handleSubmit(onFiltersSubmit)}
    >
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
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="postulant_lastName"
          label="Apellido"
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
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="postulant_dni"
          label="DNI"
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
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="postulant_email"
          label="Mail"
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
            { value: 'true', label: 'Empleado' },
            { value: 'false', label: 'Estudiante' },
          ]}
          control={control}
          name="isInternal"
          label="Tipo"
          variant="outlined"
          showError={false}
          size="small"
          placeholder="Status"
          onOptionClick={() => {
            handleSubmit(onFiltersSubmit)();
          }}
        />
      </Box>
      <input type="submit" hidden />
    </form>
  );
};

export default UserTableFilters;
