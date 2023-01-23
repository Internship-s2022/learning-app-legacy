import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseFilters } from 'src/components/shared/ui/table/components/filters/course/types';
import { courseHeadCells } from 'src/constants/head-cells';
import { cannotShowList, confirmDelete } from 'src/constants/modal-content';
import { SuperAdminRoutes } from 'src/constants/routes';
import { Course } from 'src/interfaces/entities/course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/course/actions';
import { deleteCourse, getCourses } from 'src/redux/modules/course/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';

import styles from './course-list.module.css';

const ListCourses = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedObjects, setSelectedObjects] = useState<Course[]>([]);
  const { courses, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.course,
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getCourses(
          `?isActive=true&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [dispatch, filterQuery, pagination.limit, pagination.page],
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'cursos' })));
    }
  }, [dispatch, errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const handleDelete = (id: string) => {
    dispatch(
      openModal(
        confirmDelete({
          entity: 'cursos',
          handleConfirm: () => {
            dispatch(deleteCourse(id));
          },
        }),
      ),
    );
  };

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const handleExportSelection = async (_ids: string[]) => {
    await download(
      `/course/export/csv?${convertArrayToQuery(_ids)}`,
      selectedObjects.length === courses.length ? 'courses' : 'selected-courses',
    );
  };

  const handleExportTable = async () => {
    await download(`/course/export/csv?isActive=true${filterQuery}`, 'courses');
  };

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = useCallback(
    (data: Record<string, string>) => {
      const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
      dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
    },
    [dispatch],
  );

  const handleAdmin = (_id: string) => {
    navigate(`/admin/course/${_id}`);
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  return (
    <Box data-testid="list-course-container-div" className={styles.container}>
      <div className={styles.titleContainer}>
        <Text variant="h1">Cursos</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Lista completa con los cursos actuales de la aplicación.
        </Text>
      </div>
      {errorData.error && errorData.status != 404 ? (
        <div className={styles.titleContainer}>
          <Text variant="subtitle1">Hubo un error al cargar la tabla de cursos.</Text>
        </div>
      ) : (
        <CustomTable<Course>
          headCells={courseHeadCells}
          rows={courses}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon
          handleDelete={handleDelete}
          editIcon
          handleEdit={handleEdit}
          customIconText="ADMINISTRAR"
          handleCustomIcon={handleAdmin}
          addButton={{
            text: 'Agregar curso',
            addPath: SuperAdminRoutes.addCourse.route,
            startIcon: <AddToPhotosOutlinedIcon />,
          }}
          exportButton
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          filter="course"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
          handleRefresh={handleRefresh}
        />
      )}
    </Box>
  );
};

export default ListCourses;
