import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseUserHeadCells } from 'src/constants/head-cells';
import { RoleType } from 'src/interfaces/entities/course-user';
import { User } from 'src/interfaces/entities/user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { resetQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-tutor.module.css';
import { AddTutorsProps } from './types';

const AddTutor = ({
  courseUsers,
  selectedTutors,
  setSelectedTutors,
}: AddTutorsProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pagination, users, isLoading } = useAppSelector((state: RootReducer) => state.user);
  const [filterQuery, setFilterQuery] = useState('');
  const tutors = useMemo(() => selectedTutors.map((tutor) => tutor.user), [selectedTutors]);
  const searchString = useMemo(
    () =>
      new URLSearchParams(
        courseUsers
          .filter((courseUser) => courseUser.role === 'ADMIN')
          .map((courseUser) => ['excludeIds', courseUser.user._id]),
      ).toString(),
    [courseUsers],
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsers(
          `?isInternal=true&isActive=true&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}&${searchString}`,
        ),
      );
    },
    [dispatch, filterQuery, pagination.limit, pagination.page, searchString],
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
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

  return (
    <section data-testid="assign-tutor-container-section">
      <div data-testid="assign-tutor-tittle-div" className={styles.titleContainer}>
        <Text className={styles.margin10} variant="h1">
          Asignar tutores
        </Text>
        <Text className={styles.margin10} variant="subtitle2" color="info">
          La selección de los tutores es opcional.
        </Text>
      </div>
      <Box className={styles.container}>
        <CustomTable<User>
          headCells={courseUserHeadCells}
          rows={users}
          isLoading={isLoading}
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
          handleRefresh={handleRefresh}
        />
      </Box>
    </section>
  );
};

export default AddTutor;
