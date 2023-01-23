import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QueueIcon from '@mui/icons-material/Queue';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { moduleFormHeadCells } from 'src/constants/head-cells';
import { AdminRoutes } from 'src/constants/routes';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { disableModule, getModuleById, getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './list.module.css';

const Module = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { modules, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.module,
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getModules(
          courseId,
          `&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page],
  );

  const handleEdit = (id: string) => {
    dispatch(getModuleById(courseId, id));
    navigate(`edit/${id}`);
  };

  const handleDisable = (_id: string) => {
    const module = modules.find((module) => module._id === _id);
    dispatch(
      openModal({
        title: 'Deshabilitar módulo del curso.',
        description: '¿Está seguro que desea deshabilitar a este módulo?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableModule(courseId, module._id));
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(getCourseById(courseId));
    handleRefresh();
  }, [courseId, dispatch, filterQuery, handleRefresh]);

  const handleCustomIcon = (_id: string) => {
    navigate(`info/${_id}`);
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text className={styles.title} variant="h1">
          Módulos
        </Text>
        <Text variant="subtitle1">Lista con los módulos del curso.</Text>
      </Box>
      {modules && (
        <CustomTable<ModuleType>
          checkboxes={false}
          headCells={moduleFormHeadCells}
          addButton={{
            text: 'Agregar Módulo',
            addPath: AdminRoutes.addModule.route,
            startIcon: <QueueIcon />,
          }}
          rows={modules}
          handleDelete={handleDisable}
          handleEdit={handleEdit}
          isLoading={isLoading}
          deleteIcon={true}
          editIcon={true}
          exportButton={false}
          customIconText="Ver"
          handleCustomIcon={handleCustomIcon}
          pagination={{ ...pagination, totalDocs: modules?.length }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleRefresh={handleRefresh}
        />
      )}
    </section>
  );
};

export default Module;
