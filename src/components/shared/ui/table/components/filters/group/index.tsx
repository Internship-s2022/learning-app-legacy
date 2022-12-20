import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { InputText } from 'src/components/shared/ui';
import { RootReducer } from 'src/redux/modules/types';

import styles from './group-filters.module.css';
import { GroupFilter, GroupFiltersProps } from './types';

const GroupTableFilters = ({ onFiltersSubmit }: GroupFiltersProps) => {
  const { filterQuery } = useSelector((state: RootReducer) => state.user);
  const urlParams = new URLSearchParams(filterQuery.replace(/user.postulant./g, 'user_postulant_'));
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<GroupFilter>({
    defaultValues: {
      user_postulant_firstName: '',
      user_postulant_lastName: '',
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
          name="user_postulant_lastName"
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
      <input type="submit" hidden />
    </form>
  );
};

export default GroupTableFilters;
