import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseUserHeadCells } from 'src/constants/head-cells';
import { User } from 'src/interfaces/entities/user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { resetQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import { RoleType } from '../types';
import styles from './add-tutor.module.css';
import { AddTutorsProps } from './types';

const AddTutor = ({
  courseUsers,
  selectedTutors,
  setSelectedTutors,
}: AddTutorsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pagination, users } = useAppSelector((state: RootReducer) => state.user);
  const [filterQuery, setFilterQuery] = useState('');

  const searchString = useMemo(
    () =>
      new URLSearchParams(
        courseUsers
          .filter((courseUser) => courseUser.role === 'ADMIN')
          .map((courseUser) => ['excludeIds', courseUser.user._id]),
      ).toString(),
    [courseUsers],
  );

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsers(`?isInternal=true&isActive=true&page=${newPage + 1}&limit=100${filterQuery}`),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}&${searchString}`,
      ),
    );
  };

  useEffect(() => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}&${searchString}`,
      ),
    );
  }, [filterQuery]);

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
  };

  const handlePressTutor = (users: User[]) => {
    setSelectedTutors(
      users.map((selectedUser) => ({
        user: selectedUser,
        role: 'TUTOR' as RoleType,
        isActive: true,
      })),
    );
  };

  const tutors = useMemo(() => selectedTutors.map((tutor) => tutor.user), [selectedTutors]);

  return (
    <section>
      <div className={styles.titleContainer}>
        <Text variant="h1">Asignar tutores</Text>
        <Text variant="h2">Seleccionar los tutores del curso</Text>
        <div className={styles.filterName}>
          <Text variant="h2">Filtros</Text>
        </div>
      </div>
      <Box className={styles.container}>
        <CustomTable<User>
          headCells={courseUserHeadCells}
          rows={users}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          filter="courseUser"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={tutors}
          setSelectedObjects={handlePressTutor}
        />
      </Box>
    </section>
  );
};

export default AddTutor;
