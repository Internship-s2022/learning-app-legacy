import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import { RootReducer } from 'src/redux/modules/types';

import styles from './postulant-course-filters.module.css';
import { PostulantCourseFilter, PostulantCourseFilterProps } from './types';

const PostulantCourseUserTableFilters = ({ onFiltersSubmit }: PostulantCourseFilterProps) => {
  const { filterQuery } = useSelector((state: RootReducer) => state.postulantCourse);
  const { registrationForm } = useSelector((state: RootReducer) => state.registrationForm);
  const urlParams = new URLSearchParams(filterQuery.replace(/.postulant./g, 'postulant_'));
  const objectFromParams = Object.fromEntries(urlParams);

  const { handleSubmit, control } = useForm<PostulantCourseFilter>({
    defaultValues: {
      postulant_firstName: '',
      postulant_lastName: '',
      postulant_location: '',
      postulant_age_min: '',
      postulant_age_max: '',
      view: '',
      ...objectFromParams,
    },
    mode: 'onSubmit',
  });

  const defaultOption = { value: '', label: 'Ninguno' };

  const viewOptions = registrationForm?.views.map((view) => ({
    value: view._id,
    label: view.name,
  }));
  viewOptions?.unshift(defaultOption);

  return (
    registrationForm && (
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
            name="postulant_location"
            label="Ubicación"
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
        <Box className={`${styles.marginRight10} ${styles.numberInputContainer}`}>
          <InputText
            control={control}
            name="postulant_age_min"
            label="Edad min."
            type="number"
            variant="outlined"
            fullWidth={false}
            size="small"
            showError={false}
          />
        </Box>
        <Box className={`${styles.marginRight10} ${styles.numberInputContainer}`}>
          <InputText
            control={control}
            name="postulant_age_max"
            label="Edad máx."
            type="number"
            variant="outlined"
            fullWidth={false}
            size="small"
            showError={false}
          />
        </Box>
        <Box className={`${styles.marginRight10} ${styles.dropdownContainer}`}>
          <Dropdown
            control={control}
            name="view"
            label="Tipo de Formulario"
            options={viewOptions}
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
    )
  );
};

export default PostulantCourseUserTableFilters;
