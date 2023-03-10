import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseUserWithoutRoleHeadCells } from 'src/constants/head-cells';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery } from 'src/redux/modules/course-user/actions';
import { getUsersWithoutGroup } from 'src/redux/modules/course-user/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './add-student.module.css';
import { AddStudentsProps } from './types';

const AddStudent = ({
  modules,
  selectedStudents,
  setSelectedStudents,
}: AddStudentsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { pagination, courseUsers, isLoading } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );
  const [filterQuery, setFilterQuery] = useState('');

  const searchString = useMemo(
    () => new URLSearchParams(modules.map((module) => ['modules', module._id])).toString(),
    [modules],
  );

  const students = useMemo(
    () => courseUsers.filter((cUser) => cUser.role === 'STUDENT'),
    [courseUsers],
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsersWithoutGroup(
          courseId,
          `?isActive=true&role=STUDENT&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}&${searchString}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page, searchString],
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
  }, [courseId, searchString, filterQuery]);

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
  };

  const handleChangePage = (_event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  const handlePressTutor = (courseUsers: CourseUser[]) => {
    setSelectedStudents(courseUsers);
  };

  return (
    <section data-testid="assign-student-container-section">
      <div data-testid="assign-student-tittle-div" className={styles.titleContainer}>
        <Text className={styles.margin10} variant="h1">
          Asignar alumnos
        </Text>
        <Text className={styles.margin10} variant="subtitle1">
          Seleccionar los alumnos del curso que no tienen grupo asignado en los m??dulos
          seleccionados previamente.
        </Text>
        <Text className={styles.margin10} variant="subtitle2" color="info">
          Se debe seleccionar al menos un alumno.
        </Text>
      </div>
      <Box className={styles.container}>
        <CustomTable<CourseUser>
          headCells={courseUserWithoutRoleHeadCells}
          rows={students}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          filter="userGroup"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedStudents}
          setSelectedObjects={handlePressTutor}
        />
      </Box>
    </section>
  );
};

export default AddStudent;
