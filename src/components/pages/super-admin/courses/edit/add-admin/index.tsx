import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseUserFilter } from 'src/components/shared/ui/table/components/filters/courseUser/types';
import { courseUserHeadCells } from 'src/constants/head-cells';
import { User } from 'src/interfaces/entities/user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';
import { resetQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-admin.module.css';

const AddAdmin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pagination, users, isLoading } = useAppSelector((state: RootReducer) => state.user);
  const courseAdmins = useAppSelector((state: RootReducer) =>
    state.courseUser.courseUsers.filter((cUser) => cUser.role === 'ADMIN'),
  );
  const [filterQuery, setFilterQuery] = useState('');
  const [admins, setSelectedAdmins] = useState<User[]>([]);
  const restAdmins = 5 - courseAdmins.length;
  const canAddMore = restAdmins < 6;
  const isValid = canAddMore && admins.length <= restAdmins;

  const searchString = useMemo(
    () => new URLSearchParams(courseAdmins.map((admin) => ['excludeIds', admin._id])).toString(),
    [courseAdmins],
  );

  const handleChangePage = (_event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${newPage + 1}&limit=${
          pagination.limit
        }${filterQuery}&${searchString}`,
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
        )}${filterQuery}&${searchString}`,
      ),
    );
  };

  useEffect(() => {
    dispatch(
      getUsers(
        `?isInternal=true&isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}${searchString}`,
      ),
    );
  }, [filterQuery]);

  const onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
  };

  const onCancel = () => {
    setSelectedAdmins([]);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.buttons}>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              className={styles.save}
              variant="contained"
              type="submit"
              color="secondary"
              startIcon={<LockIcon />}
              disabled={admins.length < 1 || !isValid}
            >
              Guardar cambios
            </Button>
          </div>
          <div className={styles.infoContainer}>
            <Text variant="h2">Asignar administradores</Text>
            <Text variant="subtitle1">Seleccionar los administradores del curso</Text>
            <Text variant="subtitle2" color={!isValid ? 'error' : 'info'}>
              {restAdmins
                ? `Se puede seleccionar máximo de ${restAdmins}`
                : 'No se puede agregar mas administradores'}
            </Text>
          </div>
        </div>
      </div>
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
        setSelectedObjects={setSelectedAdmins}
      />
    </>
  );
};
export default AddAdmin;
