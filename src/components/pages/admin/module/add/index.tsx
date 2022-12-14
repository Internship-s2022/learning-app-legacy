import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import { Dropdown, InputText, Text, TransferList } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/inputs/autocomplete';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-module.module.css';

const AddModule = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { modules, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.module,
  );
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const [right, setRight] = useState<TransferListData[]>([]);
  const dropdownOptions = [
    { value: 'ARG', label: 'Argentina' },
    { value: 'PAR', label: 'Paraguay' },
    { value: 'BOL', label: 'Bolivia' },
    { value: 'URG', label: 'Uruguay' },
  ];

  useEffect(() => {
    dispatch(
      getModules(courseId, `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, []);

  const { handleSubmit, control, setError, clearErrors } = useForm<ModuleType>({
    defaultValues: {
      name: '',
      description: '',
      status: 'PENDING',
      type: 'DEV',
      groups: [],
      contents: [],
      isActive: true,
    },
    mode: 'onSubmit',
  });

  const onSubmit = (data) => {
    dispatch(
      openModal({
        title: 'MODAL INFO',
        type: 'confirm',
        description: 'new modal',
        handleConfirm: () => console.log(data),
      }),
    );
  };

  return (
    <section className={styles.container}>
      <Text variant="subtitle1" className={styles.backBtn}>
        Volver
      </Text>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.spaceContainer}>
          <Box className={styles.nameDescriptionContainer}>
            <Text variant="h1">Nombre de Módulo</Text>
            <InputText
              className={styles.inputText}
              control={control}
              name="name"
              label="Nombre de modulo"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box className={styles.btnContainer}>
            <Button className={styles.btn} variant="contained">
              Cancelar
            </Button>
            <Button className={styles.btn} variant="contained" color="secondary" type="submit">
              Agregar Modulo
            </Button>
          </Box>
        </Box>
        <Box className={styles.nameDescriptionContainer}>
          <Text variant="h2">Descripcion</Text>
          <InputText
            className={styles.inputText}
            control={control}
            name="description"
            label="Nombre de modulo"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box className={styles.container2}>
          <Box className={styles.autocompleteContainer}>
            <Text>Contenido de Modulo</Text>
            <AutocompleteInput control={control} name="contents" options={[]} />
          </Box>
          <Text>Lista de evaluaciones</Text>
          <Box className={styles.inputContainer}>
            <Text>Tipo de modulo</Text>
            <Dropdown
              variant="standard"
              control={control}
              name="type"
              options={dropdownOptions}
              label="Tipo de modulo"
              margin="normal"
            />
            <Dropdown
              variant="standard"
              control={control}
              name="status"
              options={dropdownOptions}
              label="Estado de modulo"
              margin="normal"
            />
          </Box>
        </Box>
        <Box className={styles.transferListContainer}>
          {/* <TransferList isLoading={isLoading} options={modules} selected={modules[0]?.groups} /> */}
        </Box>
      </form>
    </section>
  );
};

export default AddModule;
