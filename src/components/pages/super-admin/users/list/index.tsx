import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';

import { Preloader, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { userHeadCells } from 'src/constants/head-cells';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { deleteUser, getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';
import { download } from 'src/utils/export-csv';

import styles from './user-list.module.css';

const ListUser = (): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { users, error, isLoading } = useSelector((state: RootReducer) => state.user);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers(''));
    }
  }, []);

  useEffect(() => {
    if (error?.length) {
      dispatch(
        openModal({
          title: 'Ocurrio un error',
          description: error,
          type: 'alert',
        }),
      );
    }
  }, [error]);

  const handleEdit = (_id: string) => {
    alert(`Edit user with id: ${_id}`);
  };

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

  const handleExportSelection = (_ids: string[]) => {
    alert(`Selection (${_ids.length} items): ${_ids}`);
  };

  const handleExportTable = (entity: string) => {
    download(entity);
  };

  const onFiltersSubmit = (data: string) => {
    dispatch(getUsers(data));
  };

  return (
    <Container className={styles.container}>
      <Text variant="h1">Usuarios</Text>
      <Text variant="h3" className={styles.subtitle}>
        Lista completa con los usuarios actuales de la aplicacion.
      </Text>
      {isLoading ? (
        <Preloader />
      ) : users.length ? (
        <CustomTable<User>
          headCells={userHeadCells}
          rows={users}
          icons={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          exportButtons={true}
          addButton={{ text: 'Agregar usuario', addPath: '/super-admin/users/add' }}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          // filters={['id', 'name', 'status']}
          // onFiltersSubmit={onFiltersSubmit}
        />
      ) : null}
    </Container>
  );
};

export default ListUser;
