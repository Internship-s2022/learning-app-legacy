import React, { useEffect, useState } from 'react';
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
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { stateOptions, typeOptions } from 'src/constants/dropdown-options';
import { confirmCancel, genericError } from 'src/constants/modal-content';
import { ModuleForm } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getGroups } from 'src/redux/modules/group/thunks';
import { createModule } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import { resolverModule } from '../validations';
import styles from './add-module.module.css';

const AddModule = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { groups, isLoading: isLoadingGroup } = useAppSelector((state: RootReducer) => state.group);
  const { isLoading: isLoadingModule } = useAppSelector((state: RootReducer) => state.module);
  const [right, setRight] = useState<TransferListData[]>([]);
  const arr = [];
  const mainRoute = `/admin/course/${courseId}/modules`;

  useEffect(() => {
    if (!groups.length) {
      dispatch(getGroups(courseId, ''));
    }
  }, [courseId, dispatch, groups]);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid, isDirty },
    trigger,
  } = useForm<ModuleForm>({
    defaultValues: {
      name: '',
      description: '',
      status: 'PENDING',
      type: 'GENERAL',
      contents: [],
      groups: [],
      isActive: true,
    },
    resolver: resolverModule,
    mode: 'all',
  });

  useEffect(() => {
    setValue(
      'groups',
      right.map((e) => e._id),
    );
  }, [right, setValue]);

  const onSubmit = (data) => {
    dispatch(
      openModal({
        title: 'Creación de módulo',
        type: 'confirm',
        description: 'Esta seguro que desea agregar este módulo?',
        handleConfirm: async () => {
          const response = await dispatch(
            createModule(courseId, {
              ...data,
              groups: right.map((e) => e._id),
            }),
          );
          if ('error' in response.payload) {
            dispatch(openModal(genericError));
          } else {
            navigate(mainRoute);
          }
        },
      }),
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
              disabled={!isValid}
            >
              Guardar cambios
            </CustomButton>
          </Box>
        </Box>
        <InputText
          className={styles.inputDescription}
          rows={4}
          multiline
          control={control}
          name="description"
          label="Descripción del modulo"
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box className={styles.spaceAroundContainer}>
          <Box className={styles.autocompleteContainer}>
            <Box className={styles.autocomplete}>
              <Text color="primary" className={styles.autocompleteLabel} variant="h2">
                Contenido de Modulo
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
          {groups ? (
            <TransferList
              isLoading={isLoadingGroup || isLoadingModule}
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

export default AddModule;
