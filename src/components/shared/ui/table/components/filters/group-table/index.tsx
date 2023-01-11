import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

import { InputText } from 'src/components/shared/ui';
import { RootReducer } from 'src/redux/modules/types';

import styles from './group-filters.module.css';
import { GroupFiltersProps, GroupTableFilter } from './types';

const GroupTableFilters = ({ onFiltersSubmit }: GroupFiltersProps) => {
  const { filterQuery } = useSelector((state: RootReducer) => state.user);
  const urlParams = new URLSearchParams(
    filterQuery.replace(/tutor.postulant./g, 'tutor_postulant_'),
  );
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<GroupTableFilter>({
    defaultValues: {
      name: '',
      tutor_postulant_firstName: '',
      tutor_postulant_lastName: '',
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
          label="Nombre del grupo"
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
          name="tutor_postulant_firstName"
          label="Nombre del tutor"
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
          name="tutor_postulant_lastName"
          label="Apellido del tutor"
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

export default GroupTableFilters;
