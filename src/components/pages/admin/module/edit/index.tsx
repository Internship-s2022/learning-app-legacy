import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import {
  CustomButton,
  Dropdown,
  GoBackButton,
  InputText,
  Text,
  TransferList,
} from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/inputs/autocomplete';
import { stateOptions, typeOptions } from 'src/constants/dropdown-options';
import { confirmCancel, confirmEdit, invalidForm } from 'src/constants/modal-content';
import { ModuleForm, ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getGroups } from 'src/redux/modules/group/thunks';
import { editModule, getModuleById } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { isArrayEqual } from 'src/utils/arrays-comparator';

import { resolverModule } from '../validations';
import styles from './edit-module.module.css';

const EditModule = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId, moduleId } = useParams();
  const { groups, isLoading: isLoadingGroup } = useAppSelector((state: RootReducer) => state.group);
  const { module, isLoading: isLoadingModule } = useAppSelector(
    (state: RootReducer) => state.module,
  );
  const [selectedGroups, setSelectedGroups] = useState([]);
  const mainRoute = `/admin/course/${courseId}/modules`;

  const isEqual = useMemo(
    () =>
      isArrayEqual(
        selectedGroups?.map((group) => group._id),
        module?.groups?.map((group) => group._id),
      ),
    [selectedGroups, module?.groups],
  );

  const {
    handleSubmit,
    control,
    reset,
    trigger,
    formState: { isDirty },
  } = useForm<ModuleForm>({
    defaultValues: {
      name: '',
      description: '',
      status: 'PENDING',
      type: 'GENERAL',
      contents: [],
      groups: [],
    },
    resolver: resolverModule,
    mode: 'all',
  });

  const getModule = useCallback(async () => {
    const response = await dispatch(getModuleById(courseId, moduleId));
    if ('data' in response.payload && response.payload.data) {
      const data: ModuleType = response.payload.data;
      reset({
        name: data.name,
        description: data.description,
        status: data.status,
        type: data.type,
        contents: data.contents,
      });
    }
  }, [courseId, dispatch, moduleId, reset]);

  useEffect(() => {
    getModule();
    dispatch(getGroups(courseId, ''));
    dispatch(getModuleById(courseId, moduleId));
  }, [courseId, dispatch, getModule, moduleId]);

  useEffect(() => {
    if (module?.groups?.length) {
      setSelectedGroups(module?.groups);
    }
  }, [module?.groups]);

  const handleEditModule = async (data: ModuleForm) => {
    const response = await dispatch(
      editModule(courseId, module._id, {
        ...data,
        groups: selectedGroups.map((group) => group._id),
        isActive: true,
      }),
    );
    if ('error' in response.payload && response.payload.error) {
      dispatch(openModal(invalidForm));
    } else {
      navigate(mainRoute);
    }
  };

  const onEditModule = (data: ModuleForm) => {
    dispatch(
      openModal(confirmEdit({ entity: 'módulo', handleConfirm: () => handleEditModule(data) })),
    );
  };

  const onCancel = () => {
    if (isDirty) {
      dispatch(
        openModal(
          confirmCancel({
            handleConfirm: () => navigate(mainRoute),
          }),
        ),
      );
    } else {
      reset();
      navigate(mainRoute);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.backBtn}>
        <GoBackButton route={mainRoute} />
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onEditModule)}>
        <Box className={styles.spaceContainer}>
          <Box className={styles.nameDescriptionContainer}>
            <InputText
              control={control}
              showError={true}
              name="name"
              label="Nombre del módulo"
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
              isLoading={isLoadingGroup || isLoadingModule}
              type="submit"
              color="secondary"
              startIcon={<LockIcon />}
              disabled={isEqual && !isDirty}
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
          label="Descripción del módulo"
          size="medium"
          rows={4}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box className={styles.spaceAroundContainer}>
          <Box className={styles.autocompleteContainer}>
            <Box className={styles.autocomplete}>
              <Text color="primary" className={styles.autocompleteLabel} variant="h2">
                Contenido de Módulo
              </Text>
              <AutocompleteInput
                onBlur={() => trigger('contents')}
                control={control}
                name="contents"
                options={[]}
              />
            </Box>
          </Box>
          <Box className={styles.dropdownContainer}>
            <Text variant="h2" color="primary">
              Tipo de módulo
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
              label="Estado de módulo"
              margin="normal"
            />
          </Box>
        </Box>
        <Box className={styles.transferListContainer}>
          <TransferList
            isLoading={isLoadingGroup || isLoadingModule}
            options={groups}
            selected={selectedGroups}
            right={selectedGroups}
            setRight={setSelectedGroups}
          />
        </Box>
      </form>
    </section>
  );
};

export default EditModule;
