import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseHeadCells } from 'src/constants/head-cells';
import { SuperAdminRoutes } from 'src/constants/routes';
import { Course } from 'src/interfaces/entities/course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/course/actions';
import { deleteCourse, getCourses } from 'src/redux/modules/course/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { download } from 'src/utils/export-csv';

import styles from './course-list.module.css';

const ListCourses = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedObjects, setSelectedObjects] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { courses, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.course,
  );

  useEffect(() => {
    dispatch(
      getCourses(`?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);

  useEffect(() => {
    const today = new Date().toISOString();
    setFilteredCourses(
      courses.map((course) => {
        let status = 'Próximo';
        if (course.startDate < today && today < course.endDate) {
          status = 'En curso';
        } else if (today > course.endDate) {
          status = 'Completado';
        }
        return { ...course, status: status };
      }),
    );
  }, [courses]);

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

  const handleEdit = (_id: string) => {
    alert(`EDITAR coursocon ID: ${_id}`);
  };

  const handleExportSelection = (_ids: string[]) => {
    alert(`Selection (${_ids.length} items): ${_ids}`);
  };

  const handleExportTable = () => {
    download(`/course/export/csv?isActive=true${filterQuery}`, 'courses');
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getCourses(`?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`),
    );
  };

  const handleCustomIcon = (_id: string) => {
    alert(`ADMINISTRAR courso con ID: ${_id}`);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getCourses(
        `?isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

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
          rows={filteredCourses}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={true}
          handleDelete={handleDelete}
          editIcon={true}
          handleEdit={handleEdit}
          customIconText="ADMINISTRAR"
          handleCustomIcon={handleCustomIcon}
          addButton={{ text: 'Agregar curso', addPath: SuperAdminRoutes.addCourse.route }}
          exportButton={true}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          filter="course"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      )}
    </Box>
  );
};

export default ListCourses;
