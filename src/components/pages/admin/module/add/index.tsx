import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Dropdown, InputText, Text, TransferList } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/inputs/autocomplete';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-module.module.css';
import { resolverModule } from './validations';

const AddModule = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { modules, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.module,
  );
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const [right, setRight] = useState<TransferListData[]>([]);

  const stateOptions = [
    { value: 'PENDING', label: 'Pendiente' },
    { value: 'IN_PROGRESS', label: 'En Progreso' },
    { value: 'COMPLETED', label: 'Completado' },
  ];

  const typeOptions = [
    { value: 'DEV', label: 'Dev' },
    { value: 'QA', label: 'Qa' },
    { value: 'UXUI', label: 'UXUI' },
    { value: 'GENERAL', label: 'General' },
  ];

  useEffect(() => {
    dispatch(
      getModules(courseId, `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, []);

  const {
    handleSubmit,
    control,
    formState: { isValid },
    setError,
    clearErrors,
    reset,
  } = useForm<ModuleType>({
    defaultValues: {
      name: '',
      description: '',
      status: 'PENDING',
      type: 'DEV',
      contents: [],
      isActive: true,
    },
    resolver: resolverModule,
    mode: 'onChange',
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
            <InputText
              control={control}
              showError={true}
              name="name"
              label="Nombre del modulo"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              type="text"
            />
          </Box>
          <Box className={styles.btnContainer}>
            <CustomButton
              className={styles.btn}
              variant="outlined"
              color="secondary"
              startIcon={<CloseIcon />}
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancelar
            </CustomButton>
            <CustomButton
              className={styles.btn}
              variant="contained"
              isLoading={isLoading}
              type="submit"
              color="secondary"
              startIcon={<LockIcon />}
              disabled={!isValid}
              // onClick={onSaveClick}
            >
              Guardar cambios
            </CustomButton>
          </Box>
        </Box>
        <InputText
          className={styles.inputDescriptionContainer}
          multiline
          control={control}
          name="description"
          label="Descripcion del modulo"
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box className={styles.spaceAroundContainer}>
          <Box className={styles.autocompleteContainer}>
            <Text color="primary" className={styles.autocompleteLabel} variant="h2">
              Contenido de Modulo
            </Text>
            <AutocompleteInput control={control} name="contents" options={[]} />
          </Box>
          <Box>
            <Text variant="h2" color="primary">
              Lista de evaluaciones
            </Text>
            <ul color="primary">
              <li className={styles.list}>
                <Text color="primary">Problematica</Text>
              </li>
              <li className={styles.list}>
                <Text color="primary">Quiz</Text>
              </li>
            </ul>
          </Box>
          <Box className={styles.dropdownContainer}>
            <Text variant="h2" color="primary">
              Tipo de modulo
            </Text>
            <Dropdown
              variant="outlined"
              control={control}
              name="type"
              showError={true}
              options={typeOptions}
              label="Tipo de modulo"
              margin="normal"
            />
            <Dropdown
              variant="outlined"
              control={control}
              name="status"
              showError={true}
              options={stateOptions}
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
