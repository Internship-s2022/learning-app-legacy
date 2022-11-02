import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Preloader, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/table-filters/user-filters/types';
import { courseHeadCells } from 'src/constants/head-cells';
import { SuperAdminRoutes } from 'src/constants/routes';
import { resetQuery, setQuery } from 'src/redux/modules/course/actions';
import { deleteCourse, getCourses } from 'src/redux/modules/course/thunks';
import { Course } from 'src/redux/modules/course/types';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { download } from 'src/utils/export-csv';

import styles from './course-list.module.css';

const ListCourses = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const { courses, errorData, isLoading, pagination, filterQuery } = useSelector(
    (state: RootReducer) => state.course,
  );

  useEffect(() => {
    dispatch(getCourses(`?page=${pagination.page}&limit=${pagination.limit}${filterQuery}`));
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(
        openModal({
          title: 'Ocurrio un error',
          description: 'No se puede mostrar la lista de cursos, intente nuevamente.',
          type: 'alert',
        }),
      );
    }
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleDelete = (id: string) => {
    dispatch(
      openModal({
        title: 'Eliminar curso',
        description: '¿Está seguro que desea eliminar este curso?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(deleteCourse(id));
        },
      }),
    );
  };

  const handleEdit = (dni: string) => {
    history(`edit/${dni}`);
  };

  const handleExportSelection = (_ids: string[]) => {
    alert(`Selection (${_ids.length} items): ${_ids}`);
  };

  const handleExportTable = () => {
    download(`/course/export/csv?${filterQuery}`, 'courses');
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(getCourses(`?page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`));
  };

  const handleCustomIcon = (_id: string) => {
    alert(_id);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getCourses(
        `?page=${pagination.page}&limit=${parseInt(event.target.value, 10)}${filterQuery}`,
      ),
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Box className={styles.container}>
      <div className={styles.titleContainer}>
        <Text variant="h1">Cursos</Text>
      </div>
      {errorData.error && errorData.status != 404 ? (
        <div className={styles.titleContainer}>
          <Text variant="h2">Hubo un error al cargar la tabla de cursos.</Text>
        </div>
      ) : (
        <CustomTable<Course>
          headCells={courseHeadCells}
          rows={courses}
          pagination={pagination}
          deleteIcon={true}
          handleDelete={handleDelete}
          editIcon={true}
          handleEdit={handleEdit}
          customIconText="ADMINISTRAR"
          handlecustomIcon={handleCustomIcon}
          addButton={{ text: 'Agregar curso', addPath: SuperAdminRoutes.addUser.route }}
          exportButton={true}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          filter="course"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default ListCourses;
