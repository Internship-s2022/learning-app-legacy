import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { setQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

import { AddAdminCourse } from './types';

const AddAdmin = ({ course, setCourse, setUsersFiltered }: any): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const [selectedAdmins, setSelectedAdmins] = useState<Record<string, unknown>[]>([]);

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsers(`?isInternal=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`),
    );
  };
  interface UserFilters {
    postulant_firstName: string;
    postulant_lastName: string;
    isActive: string;
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsers(
        `?isInternal=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const { users, pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    dispatch(getUsers(`?isInternal=true&page=${pagination.page}&limit=100${filterQuery}`));
  }, [filterQuery]);

  const handleContinue = () => {
    const admins = selectedAdmins.map((selectedAdmin) => ({
      user: selectedAdmin,
      role: 'ADMIN',
      isActive: true,
    }));

    setCourse((prevValue) => {
      return { ...prevValue, courseUsers: admins };
    });
    setUsersFiltered(
      users.filter((user) =>
        admins.filter((admin) => admin.user._id === user._id).length ? false : true,
      ),
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const userHeadCells: HeadCell<User>[] = [
    {
      id: 'postulant.firstName',
      numeric: false,
      disablePadding: false,
      label: 'NOMBRE',
    },
    {
      id: 'postulant.lastName',
      numeric: false,
      disablePadding: false,
      label: 'APELLIDO',
    },
    {
      id: 'isActive',
      numeric: false,
      disablePadding: false,
      label: 'DISPONIBLE',
      booleanText: ['Si', 'No'],
    },
  ];

  return (
    <section>
      <Text variant="h1">Asignar administradores</Text>
      <Text variant="h2">Seleccionar los administradores del curso</Text>
      <CustomTable<User>
        headCells={userHeadCells}
        rows={users}
        pagination={pagination}
        deleteIcon={false}
        editIcon={false}
        exportButton={true}
        onFiltersSubmit={onFiltersSubmit}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        selectedObjects={selectedAdmins}
        setSelectedObjects={setSelectedAdmins}
      />
      <button onClick={handleContinue}> handle continue</button>
    </section>
  );
};
export default AddAdmin;
