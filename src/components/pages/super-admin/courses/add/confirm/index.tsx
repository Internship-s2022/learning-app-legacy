import { ThunkDispatch } from 'redux-thunk';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

const Confirm = ({ selectedUsers }: any): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { pagination, filterQuery } = useSelector((state: RootReducer) => state.user);

  const selectedUserHeadCells: HeadCell<User>[] = [
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
      id: 'role',
      numeric: false,
      disablePadding: false,
      label: 'ROL',
    },
  ];
  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsers(`?isInternal=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`),
    );
  };

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
  return (
    <section>
      <CustomTable<User>
        headCells={selectedUserHeadCells}
        rows={selectedUsers}
        pagination={pagination}
        deleteIcon={false}
        editIcon={false}
        exportButton={true}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </section>
  );
};

export default Confirm;
