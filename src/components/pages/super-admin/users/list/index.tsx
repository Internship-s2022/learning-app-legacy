import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Preloader, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/table-filters/user-filters/types';
import { userHeadCells } from 'src/constants/head-cells';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { setQuery } from 'src/redux/modules/user/actions';
import { deleteUser, getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';
import { download } from 'src/utils/export-csv';

import styles from './user-list.module.css';

const ListUser = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const { users, errorData, isLoading, pagination, filterQuery } = useSelector(
    (state: RootReducer) => state.user,
  );

  useEffect(() => {
    dispatch(getUsers(`?isActive=true&page=1&limit=5${filterQuery}`));
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(
        openModal({
          title: 'Ocurrio un error',
          description: 'No se puede mostrar la lista de usuarios, intente nuevamente.',
          type: 'alert',
        }),
      );
    }
  }, [errorData]);

  const handleDelete = (id: string) => {
    dispatch(
      openModal({
        title: 'Eliminar usuario',
        description: '¿Está seguro que desea eliminar este usuario?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(deleteUser(id));
        },
      }),
    );
  };

  const handleEdit = (id: string) => {
    history(`/edit/${id}`);
  };

  const handleExportSelection = (_ids: string[]) => {
    alert(`Selection (${_ids.length} items): ${_ids}`);
  };

  const handleExportTable = (entity: string) => {
    download(entity);
  };

  const onFiltersSubmit: SubmitHandler<UserFilters> = (data: Record<string, string>, e) => {
    e.preventDefault();
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      getUsers(`?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsers(`?isActive=true&page=1&limit=${parseInt(event.target.value, 10)}${filterQuery}`),
    );
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Box className={styles.container}>
      <div className={styles.titleContainer}>
        <Text variant="h1">Usuarios</Text>
        <Text variant="h3" className={styles.subtitle}>
          Lista completa con los usuarios actuales de la aplicacion.
        </Text>
      </div>
      {errorData.error && errorData.status != 404 ? (
        <div className={styles.titleContainer}>
          <Text variant="h2">Hubo un error al cargar la tabla de usuarios.</Text>
        </div>
      ) : (
        <CustomTable<User>
          headCells={userHeadCells}
          rows={users}
          pagination={pagination}
          deleteIcon={true}
          handleDelete={handleDelete}
          editIcon={true}
          handleEdit={handleEdit}
          addButton={{ text: 'Agregar usuario', addPath: '/super-admin/users/add' }}
          exportButton={true}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          filter="user"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default ListUser;
