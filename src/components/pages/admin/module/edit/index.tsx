import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Dropdown, InputText, Text, TransferList } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/inputs/autocomplete';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { confirmCancel, confirmEdit, invalidForm } from 'src/constants/modal-content';
import { AdminRoutes } from 'src/constants/routes';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getGroups } from 'src/redux/modules/group/thunks';
import { editModule, getModuleById } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './edit-module.module.css';
import { resolverModule } from './validations';

const arr = [];

const EditModule = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const { groups } = useAppSelector((state: RootReducer) => state.group);
  const [right, setRight] = useState<TransferListData[]>([]);
  const { module, isLoading } = useAppSelector((state: RootReducer) => state.module);

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
    if (!groups.length) {
      dispatch(getGroups(courseId, ''));
    }
    getModule();
    dispatch(getModuleById(courseId, moduleId));
  }, [groups]);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isValid, isDirty, dirtyFields, errors },
  } = useForm<ModuleType>({
    defaultValues: {
      name: '',
      description: '',
      status: '',
      type: '',
      contents: [],
    },
    resolver: resolverModule,
    mode: 'all',
  });

  useEffect(() => {
    setValue(
      'groups',
      right.map((e) => e._id),
    );
  }, [right]);

  const getModule = async () => {
    const response: any = await dispatch(getModuleById(courseId, moduleId));
    if (response?.payload) {
      const data: ModuleType = response.payload.data;
      reset({
        name: data.name,
        description: data.description,
        status: data.status,
        type: data.type,
        groups: data.groups,
        contents: data.contents,
      });
    }
  };

  const handleEditModule = async (data: ModuleType) => {
    const response = await dispatch(editModule(courseId, module._id, { ...data, isActive: true }));
    if (response) {
      dispatch(openModal(invalidForm));
    } else {
      return navigate(-1);
    }
  };

  const onEditModule = (data: ModuleType) => {
    dispatch(
      openModal(confirmEdit({ entity: 'modulo', handleConfirm: () => handleEditModule(data) })),
    );
  };

  const onCancel = () => {
    if (isDirty) {
      dispatch(
        openModal(
          confirmCancel({
            handleConfirm: () => navigate(-1),
          }),
        ),
      );
    } else {
      reset();
      return navigate(-1);
    }
  };

  return (
    <section className={styles.container}>
      <Link to={AdminRoutes.course.route} className={styles.backBtn}>
        <ArrowBackIosIcon className={styles.backIcon} />
        <Text>Volver</Text>
      </Link>
      <form className={styles.formContainer} onSubmit={handleSubmit(onEditModule)}>
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
                onCancel();
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
              disabled={!isValid && !isDirty}
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
          {groups ? (
            <TransferList
              isLoading={isLoading}
              options={groups}
              selected={arr}
              right={right}
              setRight={setRight}
            />
          ) : null}
        </Box>
      </form>
    </section>
  );
};

export default EditModule;
