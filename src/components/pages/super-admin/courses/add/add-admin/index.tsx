import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseUserFilter } from 'src/components/shared/ui/table/components/filters/courseUser/types';
import { courseUserHeadCells } from 'src/constants/head-cells';
import { RoleType } from 'src/interfaces/entities/course-user';
import { User } from 'src/interfaces/entities/user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { resetQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-admin.module.css';
import { AddAdminProps } from './types';

const AddAdmin = ({
  selectedAdmins,
  setSelectedAdmins,
  isValidContinueAdmin,
}: AddAdminProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pagination, users, isLoading } = useAppSelector((state: RootReducer) => state.user);
  const [filterQuery, setFilterQuery] = useState('');
  const admins = useMemo(() => selectedAdmins.map((admin) => admin.user), [selectedAdmins]);

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsers(
          `?isInternal=true&isActive=true&page=${options?.newPage || pagination.page}&limit=${
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

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>> = useCallback(
    (data: Record<string, string>) => {
      const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
      setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
    },
    [],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  const handlePressAdmin = (users: User[]) => {
    setSelectedAdmins(
      users.map((selectedUser) => ({
        user: selectedUser,
        role: 'ADMIN' as RoleType,
        isActive: true,
      })),
    );
  };

  return (
    <Box data-testid="assign-admin-container-div">
      <div data-testid="assign-admin-tittle-div" className={styles.titleContainer}>
        <Text className={styles.margin10} variant="h1">
          Asignar administradores
        </Text>
        <Text className={styles.margin10} variant="subtitle1">
          Seleccionar los administradores del curso
        </Text>
        <Text
          className={styles.margin10}
          variant="subtitle2"
          color={isValidContinueAdmin ? 'error' : 'info'}
        >
          Se puede seleccionar al menos uno, máximo 5
        </Text>
      </div>
      <div className={styles.container}>
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
          selectedObjects={admins}
          setSelectedObjects={handlePressAdmin}
          handleRefresh={handleRefresh}
        />
      </div>
    </Box>
  );
};
export default AddAdmin;
