import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Text, TransferList } from 'src/components/shared/ui';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { confirmEdit, invalidForm } from 'src/constants/modal-content';
import { Group } from 'src/interfaces/entities/group';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editGroup, getGroup } from 'src/redux/modules/group/thunks';
import { getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-modules.module.css';

const EditModules = (): JSX.Element => {
  const [selectedModules, setSelectedModules] = useState<ModuleType[]>();
  const [right, setRight] = useState<TransferListData[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const { group, isLoading } = useAppSelector((state: RootReducer) => state.group);
  const { modules } = useAppSelector((state: RootReducer) => state.module);
  const courseUsersStr = group?.courseUsers.map((e) => e._id);

  useEffect(() => {
    dispatch(getModules(courseId, ''));
    dispatch(getGroup(courseId, groupId));
  }, []);

  const { setValue, handleSubmit } = useForm<Group>({
    mode: 'all',
  });

  useEffect(() => {
    if (right?.length) {
      setValue(
        'modules',
        right.map((e) => e._id),
      );
    }
  }, [right]);

  const handleEditModule = async (data: Group) => {
    console.log('data', {
      ...data,
      name: group?.name,
      type: group?.type,
      courseUsers: courseUsersStr,
      isActive: true,
    });
    const response = await dispatch(
      editGroup(courseId, groupId, {
        ...data,
        name: group?.name,
        type: group?.type,
        courseUsers: courseUsersStr,
        isActive: true,
      }),
    );
    if ('error' in response.payload && response.payload.error) {
      dispatch(openModal(invalidForm));
    } else {
      return navigate(-1);
    }
  };

  const onEditModule = (data: Group) => {
    dispatch(
      openModal(confirmEdit({ entity: 'group', handleConfirm: () => handleEditModule(data) })),
    );
  };

  return (
    <section data-testid="add-group-container-section" className={styles.container}>
      <form onSubmit={handleSubmit(onEditModule)}>
        <div className={styles.titleContainer}>
          <Text variant="h1">Módulos</Text>
          <Text variant="subtitle1" className={styles.subtitle}>
            Asigna los módulos correspondientes al grupo.
          </Text>
          <Text className={styles.margin15} variant="subtitle2">
            Se debe asignar al menos un módulo.
          </Text>
          <CustomButton
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
            variant="contained"
            type="submit"
            color="secondary"
            startIcon={<LockIcon />}
          >
            Guardar cambios
          </CustomButton>
        </div>
        <Box className={styles.transferListContainer}>
          <TransferList
            options={modules}
            selected={selectedModules}
            right={right}
            setRight={setRight}
            isLoading={isLoading}
            disableButtons={false}
          />
        </Box>
      </form>
    </section>
  );
};

export default EditModules;
