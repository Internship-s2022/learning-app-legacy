import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { moduleFormHeadCells } from 'src/constants/head-cells';
import { SuperAdminRoutes } from 'src/constants/routes';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { disableModule, getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './module.module.css';

const Module = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { modules, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.module,
  );

  const handleDisable = (_id: string) => {
    const module = modules.find((module) => module._id === _id);
    dispatch(
      openModal({
        title: 'Deshabilitar modulo del curso.',
        description: '¿Está seguro que desea deshabilitar a este modulo?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableModule(courseId, module._id));
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      getModules(courseId, `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, []);
  console.log(
    '`&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`',
    `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
  );
  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text className={styles.subTitle} variant="subtitle1">
          Administrador
        </Text>
        <Text className={styles.title} variant="h1">
          Módulos
        </Text>
      </Box>
      {modules && (
        <CustomTable<ModuleType>
          checkboxes={false}
          headCells={moduleFormHeadCells}
          addButton={{ text: 'Agregar Módulo', addPath: SuperAdminRoutes.addModule.route }}
          rows={modules}
          handleDelete={handleDisable}
          isLoading={isLoading}
          deleteIcon={true}
          editIcon={true}
          exportButton={false}
          customIconText="Ver"
          pagination={{ ...pagination, totalDocs: modules?.length }}
          handleChangePage={() => undefined}
          handleChangeRowsPerPage={() => undefined}
        />
      )}
    </section>
  );
};

export default Module;
