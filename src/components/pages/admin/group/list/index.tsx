import React, { useCallback, useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { GroupTableFilter } from 'src/components/shared/ui/table/components/filters/group-table/types';
import { groupsHeadCells } from 'src/constants/head-cells';
import { confirmDelete } from 'src/constants/modal-content';
import { AdminRoutes } from 'src/constants/routes';
import { Group } from 'src/interfaces/entities/group';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { setQuery } from 'src/redux/modules/group/actions';
import { disableGroup, getGroups } from 'src/redux/modules/group/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { download } from 'src/utils/export-csv';

import styles from './list.module.css';

const Groups = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { isLoading, pagination, filterQuery } = useAppSelector((state) => state.group);
  const groups = useAppSelector((state) =>
    state.group.groups.map((group) => ({
      ...group,
      tutor: {
        ...group.tutor,
        fullName: group?.tutor?.postulant
          ? `${group.tutor.postulant.firstName} ${group.tutor.postulant.lastName}`
          : '',
      },
    })),
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getGroups(
          courseId,
          `?isActive=true&sort[name]=1&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page],
  );

  useEffect(() => {
    dispatch(getCourseById(courseId));
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, filterQuery]);

  const handleEdit = (_id: string) => {
    navigate(`edit/${_id}`);
  };

  const handleExportTable = async () => {
    await download(`/course/${courseId}/group/export/csv/?isActive=true${filterQuery}`, 'groups');
  };

  const handleDisable = (_id: string) => {
    const group = groups.find((group) => group._id === _id);
    dispatch(
      openModal(
        confirmDelete({
          entity: 'grupo',
          handleConfirm: () => dispatch(disableGroup(courseId, group._id)),
        }),
      ),
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<GroupTableFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1">Grupos</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Lista de todos los grupos pertenecientes al curso.
        </Text>
      </Box>
      {groups && (
        <CustomTable<Group>
          checkboxes={false}
          headCells={groupsHeadCells}
          rows={groups}
          isLoading={isLoading}
          deleteIcon={true}
          editIcon={true}
          addButton={{
            text: 'Agregar Grupo',
            addPath: AdminRoutes.addGroup.route,
            startIcon: <GroupAddIcon />,
          }}
          filter="groupList"
          onFiltersSubmit={onFiltersSubmit}
          handleEdit={handleEdit}
          handleExportTable={handleExportTable}
          handleDelete={handleDisable}
          exportButton={true}
          pagination={pagination}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleRefresh={handleRefresh}
        />
      )}
    </section>
  );
};

export default Groups;
