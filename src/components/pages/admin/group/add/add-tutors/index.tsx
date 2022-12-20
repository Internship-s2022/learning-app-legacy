import React, { useEffect, useState } from 'react';
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
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { RootReducer } from 'src/redux/modules/types';

import styles from './add-tutor.module.css';
import { AddTutorsProps } from './types';

const AddTutor = ({
  selectedTutors,
  setSelectedTutors,
  isValidContinueTutors,
}: AddTutorsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { pagination, courseUsers, isLoading } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  useEffect(() => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTOR&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery]);

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTORpage=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTORpage=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
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
        <Text
          className={styles.margin10}
          variant="subtitle2"
          color={isValidContinueTutors ? 'info' : 'error'}
        >
          Se debe seleccionar como mínimo un tutor y como máximo 5 tutores.
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
          filter="group"
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
