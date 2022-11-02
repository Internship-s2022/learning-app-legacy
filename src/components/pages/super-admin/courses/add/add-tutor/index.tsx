import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { setQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

import { AddTutorType } from './types';

const AddTutor = ({
  courseId,
  courseUsers,
  setCourseUsers,
  usersFiltered,
  setSelectedUsers,
}: any): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

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
    dispatch(
      getUsers(`?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);

  const handleExportSelections = (_ids: string[]) => {
    const tutors = _ids.map((id) => ({ user: id, role: 'TUTOR', course: courseId }));
    console.log('courseId', courseId);
    console.log('tutors', tutors);
    setCourseUsers([...courseUsers, ...tutors]);
  };
  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (
    data: Record<string, string>,
    e,
  ) => {
    e.preventDefault();
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
    <>
      <section>
        <Text variant="h1">Asignar tutores</Text>
        <Text variant="h2">Seleccionar los tutores del curso</Text>
        <CustomTable<User>
          headCells={userHeadCells}
          rows={usersFiltered}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={true}
          handleExportSelection={handleExportSelections}
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <button
          onClick={() => {
            const courseUserInfo = courseUsers.map((item) => ({
              ...item,
              postulant: users.find((user) => item.user === user._id)?.postulant,
            }));
            setSelectedUsers(courseUserInfo);
            console.log('courseUserInfo', courseUserInfo);
          }}
        >
          this is
        </button>
      </section>
    </>
  );
};

export default AddTutor;
