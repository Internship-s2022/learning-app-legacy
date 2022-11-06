import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useMemo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { setQuery } from 'src/redux/modules/user/actions';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

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

const AddTutor = ({ course, selectedTutors, setSelectedTutors }: any): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { pagination, users, filterQuery } = useSelector((state: RootReducer) => state.user);
  const searchString = useMemo(
    () =>
      new URLSearchParams(
        course.courseUsers
          .filter((courseUser) => courseUser.role === 'ADMIN')
          .map((courseUser) => ['excludeIds', courseUser.user._id]),
      ).toString(),
    [course.courseUsers],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(getUsers(`?isInternal=true&page=${newPage + 1}&limit=100${filterQuery}`));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsers(
        `?isInternal=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}&${searchString}`,
      ),
    );
  };

  useEffect(() => {
    dispatch(
      getUsers(
        `?isInternal=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}&${searchString}`,
      ),
    );
  }, []);

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  return (
    <section>
      <Text variant="h1">Asignar tutores</Text>
      <Text variant="h2">Seleccionar los tutores del curso</Text>
      <CustomTable<User>
        headCells={userHeadCells}
        rows={users}
        pagination={pagination}
        deleteIcon={false}
        editIcon={false}
        exportButton={false}
        onFiltersSubmit={onFiltersSubmit}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        selectedObjects={selectedTutors}
        setSelectedObjects={setSelectedTutors}
      />
    </section>
  );
};

export default AddTutor;
