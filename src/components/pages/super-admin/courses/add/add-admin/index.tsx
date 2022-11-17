import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseUserFilter } from 'src/components/shared/ui/table/components/filters/courseUser/types';
import { courseUserHeadCells } from 'src/constants/head-cells';
import { RoleType } from 'src/interfaces/entities/course';
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

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${newPage + 1}&limit=${
          pagination.limit
        }${filterQuery}`,
      ),
    );
  };

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  useEffect(() => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    return () => {
      dispatch(
        getUsers(
          `?isInternal=true&isActive=true&page=${pagination.page}&limit=${pagination.limit}`,
        ),
      );
    };
  }, [filterQuery]);

  const onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
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

  const admins = useMemo(() => selectedAdmins.map((admin) => admin.user), [selectedAdmins]);

  return (
    <Box>
      <div className={styles.titleContainer}>
        <Text className={styles.margin10} variant="h1">
          Asignar administradores
        </Text>
        <Text className={styles.margin10} variant="h2">
          Seleccionar los administradores del curso
        </Text>
        <Text
          className={styles.margin10}
          variant="h3"
          color={isValidContinueAdmin ? 'error' : 'info'}
        >
          Se puede seleccionar al menos uno, maximo 5
        </Text>
        <Text variant="h2">Filtros</Text>
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
        />
      </div>
    </Box>
  );
};
export default AddAdmin;
