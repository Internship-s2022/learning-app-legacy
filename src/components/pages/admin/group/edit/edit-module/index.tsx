import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

import { CustomButton, Text, TransferList } from 'src/components/shared/ui';
import { TransferListData } from 'src/components/shared/ui/transfer-list/types';
import { confirmCancel, confirmEdit, invalidForm } from 'src/constants/modal-content';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { editGroup, getGroup } from 'src/redux/modules/group/thunks';
import { getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { isArrayEqual } from 'src/utils/arrays-comparator';

import styles from './edit-modules.module.css';

const EditModules = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [right, setRight] = useState<TransferListData[]>([]);
  const { courseId, groupId } = useParams();
  const { group, isLoading: isLoadingGroups } = useAppSelector((state: RootReducer) => state.group);
  const { modules, isLoading: isLoadingModules } = useAppSelector(
    (state: RootReducer) => state.module,
  );
  const disableButton = useMemo(
    () =>
      isArrayEqual(
        group.modules.map((module) => module._id),
        right.map((module) => module._id),
      ),
    [group.modules, right],
  );

  useEffect(() => {
    dispatch(getModules(courseId, ''));
    dispatch(getGroup(courseId, groupId));
  }, [courseId, dispatch, groupId]);

  const handleEditModule = async () => {
    const courseUsersStr = group?.courseUsers.map((e) => e._id);
    const response = await dispatch(
      editGroup(courseId, groupId, {
        name: group?.name,
        type: group?.type,
        courseUsers: courseUsersStr,
        modules: right.map((module) => module._id),
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
    <section className={styles.container}>
      <Box className={styles.buttonsContainer}>
        <CustomButton
          variant="outlined"
          color="secondary"
          startIcon={<CloseIcon />}
          onClick={() => {
            dispatch(openModal(confirmCancel({ handleConfirm: () => setRight(group.modules) })));
          }}
        >
          Cancelar
        </CustomButton>
        <CustomButton
          variant="contained"
          color="secondary"
          startIcon={<LockIcon />}
          onClick={onEditModule}
          disabled={disableButton}
          isLoading={isLoadingModules || isLoadingGroups}
          className={styles.submitBtn}
        >
          Guardar cambios
        </CustomButton>
      </Box>
      <Box className={styles.descriptionContainer}>
        <Text variant="h1">Módulos</Text>
        <Text variant="subtitle1">Asigna los módulos correspondientes al grupo.</Text>
        <Text variant="subtitle2">Se debe asignar al menos un módulo.</Text>
      </Box>
      <Box>
        <TransferList
          options={modules}
          selected={group?.modules}
          right={right}
          setRight={setRight}
          isLoading={isLoadingModules || isLoadingGroups}
          disableButtons={false}
        />
      </Box>
    </section>
  );
};

export default EditModules;
