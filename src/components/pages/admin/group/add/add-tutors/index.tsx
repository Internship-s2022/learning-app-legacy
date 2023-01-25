import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseUserWithoutRoleHeadCells } from 'src/constants/head-cells';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/course-user/actions';
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './add-tutor.module.css';
import { AddTutorsProps } from './types';

const AddTutor = ({ selectedTutors, setSelectedTutors }: AddTutorsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { pagination, courseUsers, isLoading, filterQuery } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsersInCourse(
          courseId,
          `?isActive=true&role=TUTOR&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page],
  );

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, filterQuery]);

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (_event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  const handlePressTutor = (courseUsers: CourseUser[]) => {
    setSelectedTutors(courseUsers);
  };

  return (
    <section data-testid="assign-tutor-container-section">
      <div data-testid="assign-tutor-tittle-div" className={styles.titleContainer}>
        <Text className={styles.margin10} variant="h1">
          Asignar tutores
        </Text>
        <Text className={styles.margin10} variant="subtitle1">
          Seleccionar los tutores del curso
        </Text>
        <Text className={styles.margin10} variant="subtitle2" color="info">
          Se debe seleccionar un tutor.
        </Text>
      </div>
      <Box className={styles.container}>
        <CustomTable<CourseUser>
          headCells={courseUserWithoutRoleHeadCells}
          rows={courseUsers}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          filter="userGroup"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedTutors}
          setSelectedObjects={handlePressTutor}
        />
      </Box>
    </section>
  );
};

export default AddTutor;
