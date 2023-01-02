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

import styles from './add-user.module.css';
import { AddUsersProps } from './types';

const AddUser = ({ maxAmount, role, title, subtitle }: AddUsersProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { course } = useAppSelector((state) => state.course);
  const { pagination, users, isLoading: isLoadingUsers } = useAppSelector((state) => state.user);
  const { courseUsers, isLoading: isLoadingCU } = useAppSelector((state) => ({
    ...state.courseUser,
    courseUsers: state.courseUser.courseUsers.filter((cUser) => cUser.user.isInternal),
  }));
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const courseUserRole = useMemo(
    () => courseUsers.filter((cUser) => cUser.role === role),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseUsers],
  );
  const restUsers = maxAmount - courseUserRole.length;
  const canAddMore = maxAmount && restUsers < maxAmount + 1;
  const isValid = maxAmount > 0 ? canAddMore && selectedUsers.length <= restUsers : true;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery, isLoadingCU]);

  const onFiltersSubmit: SubmitHandler<Partial<CourseUserFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    setFilterQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`);
  };

  const onCancel = () => {
    setSelectedUsers([]);
  };

  const onSaveClick = async () => {
    await dispatch(
      addCourseUsers({
        course: course._id,
        users: selectedUsers.map((user) => ({ user, role, isActive: true })),
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
              disabled={selectedUsers.length < 1 || !isValid}
            >
              Guardar cambios
            </Button>
          </div>
          <div className={styles.infoContainer}>
            <Text variant="h2">{title}</Text>
            <Text variant="subtitle1">{subtitle}</Text>
            {maxAmount > 0 && (
              <Text variant="subtitle2" color={!isValid ? 'error' : 'info'}>
                {restUsers
                  ? `Se puede seleccionar máximo de ${restUsers}`
                  : 'No se puede agregar mas usuarios de este rol'}
              </Text>
            )}
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
        selectedObjects={selectedUsers}
        setSelectedObjects={setSelectedUsers}
      />
    </>
  );
};

export default AddUser;
