import React from 'react';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';

import { UserFiltersForm, UserFiltersProps } from './types';
import styles from './user-filters.module.css';

const UserTableFilters = ({ onFiltersSubmit }: UserFiltersProps) => {
  const { handleSubmit, control } = useForm<UserFiltersForm>({
    defaultValues: {
      dni: '',
      email: '',
      firstName: '',
      lastName: '',
      isInternal: '',
    },
    mode: 'onSubmit',
  });

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit(onFiltersSubmit)}>
      <Box className={styles.marginRight10}>
        <InputText
          control={control}
          name="firstName"
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
          name="lastName"
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
          name="dni"
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
          name="email"
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
            { value: 'true', label: 'Employee' },
            { value: 'false', label: 'Student' },
          ]}
          control={control}
          name="isInternal"
          label="Tipo"
          variant="outlined"
          showError={false}
          size="small"
          placeholder="Status"
        />
      </Box>
      <input type="submit" hidden />
    </form>
  );
};

export default UserTableFilters;
