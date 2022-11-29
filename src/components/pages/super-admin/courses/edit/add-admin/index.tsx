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
import { addCourseUsers } from 'src/redux/modules/course-user/thunks';
import { resetQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';

import styles from './add-admin.module.css';

const AddAdmin = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.course);
  const { pagination, users, isLoading: isLoadingUsers } = useAppSelector((state) => state.user);
  const { courseUsers, isLoading: isLoadingCU } = useAppSelector((state) => ({
    ...state.courseUser,
    courseUsers: state.courseUser.courseUsers.filter((cUser) => cUser.user.isInternal),
  }));
  const [filterQuery, setFilterQuery] = useState('');
  const [admins, setSelectedAdmins] = useState<User[]>([]);
  const courseAdmins = useMemo(
    () => courseUsers.filter((cUser) => cUser.role === 'ADMIN'),
    [courseUsers],
  );
  const restAdmins = 5 - courseAdmins.length;
  const canAddMore = restAdmins < 6;
  const isValid = canAddMore && admins.length <= restAdmins;

  const searchString = useMemo(
    () =>
      new URLSearchParams(
        courseUsers.map((courseUsers) => ['excludeIds', courseUsers.user._id]),
      ).toString(),
    [courseUsers],
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
        `?isInternal=true&isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}&${searchString}`,
      ),
    );
  }, [filterQuery, isLoadingCU]);

  const onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
  };

  const onCancel = () => {
    setSelectedAdmins([]);
  };

  const onSaveClick = async () => {
    await dispatch(
      addCourseUsers({
        course: course._id,
        users: admins.map((admin) => ({ user: admin, role: 'ADMIN', isActive: true })),
      }),
    );
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
              onClick={onSaveClick}
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
        isLoading={isLoadingUsers || isLoadingCU}
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
