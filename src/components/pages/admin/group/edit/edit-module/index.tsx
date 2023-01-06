import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Text, TransferList } from 'src/components/shared/ui';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { confirmEdit, invalidForm } from 'src/constants/modal-content';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editGroup, getGroup } from 'src/redux/modules/group/thunks';
import { getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './edit-modules.module.css';

const EditModules = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [right, setRight] = useState<TransferListData[]>([]);
  const { courseId, groupId } = useParams();
  const { group, isLoading } = useAppSelector((state: RootReducer) => state.group);
  const { modules } = useAppSelector((state: RootReducer) => state.module);

  useEffect(() => {
    dispatch(getModules(courseId, ''));
    dispatch(getGroup(courseId, groupId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditModule = async () => {
    const courseUsersStr = group?.courseUsers.map((e) => e._id);
    const response = await dispatch(
      editGroup(courseId, groupId, {
        name: group?.name,
        type: group?.type,
        courseUsers: courseUsersStr,
        modules: right.map((e) => e._id),
        isActive: true,
      }),
    );
    if ('error' in response.payload) {
      dispatch(openModal(invalidForm));
    }
  };

  const onEditModule = () => {
    dispatch(openModal(confirmEdit({ entity: 'group', handleConfirm: handleEditModule })));
  };

  return (
    <section data-testid="add-group-container-section" className={styles.container}>
      <form className={styles.form}>
        <div className={styles.spaceContainer}>
          <Box className={styles.titleContainer}>
            <Text variant="h1">Módulos</Text>
            <Text variant="subtitle1" className={styles.subtitle}>
              Asigna los módulos correspondientes al grupo.
            </Text>
            <Text className={styles.margin15} variant="subtitle2">
              Se debe asignar al menos un módulo.
            </Text>
          </Box>
          <Box className={styles.btnContainer}>
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
              color="secondary"
              startIcon={<LockIcon />}
              onClick={onEditModule}
            >
              Guardar cambios
            </CustomButton>
          </Box>
        </div>
        <Box className={styles.transferListContainer}>
          <TransferList
            options={modules}
            selected={group?.modules}
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
