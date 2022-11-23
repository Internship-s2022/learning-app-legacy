import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { userHeadCells } from 'src/constants/head-cells';
import { cannotShowList, confirmDelete } from 'src/constants/modal-content';
import { SuperAdminRoutes } from 'src/constants/routes';
import { User } from 'src/interfaces/entities/user';
import { useAppDispatch, useAppSelector } from 'src/redux/';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { resetQuery, setQuery } from 'src/redux/modules/user/actions';
import { deleteUser, getUsers } from 'src/redux/modules/user/thunks';
import { convertArrayToQuery, download } from 'src/utils/export-csv';

import styles from './user-list.module.css';

const ListUser = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { users, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.user,
  );
  const navigate = useNavigate();
  const [selectedObjects, setSelectedObjects] = useState<User[]>([]);

  useEffect(() => {
    dispatch(
      getUsers(`?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'usuarios' })));
    }
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleDelete = (id: string) => {
    dispatch(
      openModal(
        confirmDelete({
          entity: 'usuario',
          handleConfirm: () => {
            dispatch(deleteUser(id));
          },
        }),
      ),
    );
  };

  const handleEdit = (dni: string) => {
    navigate(`edit/${dni}`);
  };

  const handleExportSelection = (_ids: string[]) => {
    download(`/user/export/csv?${convertArrayToQuery(_ids)}`, 'selected-users');
  };

  const handleExportTable = () => {
    download(`/user/export/csv?isActive=true${filterQuery}`, 'users');
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsers(`?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsers(
        `?isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  return (
    <Box data-testid="list-users-container-div" className={styles.container}>
      <div className={styles.titleContainer}>
        <Text variant="h1">Usuarios</Text>
        <Text variant="h3" className={styles.subtitle}>
          Lista completa con los usuarios actuales de la aplicacion.
        </Text>
      </div>
      {errorData.error && errorData.status != 404 ? (
        <div data-testid="list-users-title-container-div-error" className={styles.titleContainer}>
          <Text variant="h2">Hubo un error al cargar la tabla de usuarios.</Text>
        </div>
      ) : (
        <CustomTable<User>
          headCells={userHeadCells}
          rows={users}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={true}
          handleDelete={handleDelete}
          editIcon={true}
          handleEdit={handleEdit}
          addButton={{ text: 'Agregar usuario', addPath: SuperAdminRoutes.addUser.route }}
          exportButton={true}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          filter="user"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      )}
    </Box>
  );
};

export default ListUser;
