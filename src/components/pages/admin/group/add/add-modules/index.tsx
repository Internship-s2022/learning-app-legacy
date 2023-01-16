import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text, TransferList } from 'src/components/shared/ui';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './add-modules.module.css';
import { AddModulesProps } from './types';

const AddModules = ({
  selectedModules,
  setSelectedModules,
  isValidContinueModules,
}: AddModulesProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { modules, isLoading } = useAppSelector((state: RootReducer) => state.module);

  useEffect(() => {
    if (!modules?.length) {
      dispatch(getModules(courseId, ''));
    }
  }, [courseId, dispatch, modules?.length]);

  return (
    <section data-testid="add-group-container-section" className={styles.container}>
      <div className={styles.titleContainer}>
        <Text variant="h1">Módulos</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Asigna los módulos correspondientes al grupo.
        </Text>
        <Text
          className={styles.margin15}
          variant="subtitle2"
          color={isValidContinueModules ? 'info' : 'error'}
        >
          Se debe asignar al menos un módulo.
        </Text>
      </div>
      <Box className={styles.transferListContainer}>
        <TransferList
          options={modules}
          selected={selectedModules}
          right={selectedModules}
          setRight={setSelectedModules}
          isLoading={isLoading}
          disableButtons={false}
        />
      </Box>
    </section>
  );
};

export default AddModules;
