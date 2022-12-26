import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { groupsHeadCells } from 'src/constants/head-cells';
import { confirmDelete } from 'src/constants/modal-content';
import { AdminRoutes } from 'src/constants/routes';
import { Group } from 'src/interfaces/entities/group';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { disableGroup, getGroups } from 'src/redux/modules/group/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { download } from 'src/utils/export-csv';

import styles from './groups.module.css';

const Groups = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { groups, isLoading, pagination, filterQuery } = useAppSelector((state) => state.group);

  useEffect(() => {
    if (!groups.length) {
      dispatch(
        getGroups(
          courseId,
          `?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
        ),
      );
    }
  }, [groups, filterQuery]);

  const handleEdit = (_id: string) => {
    navigate(`edit?view=${_id}`);
  };

  const handleExportTable = () => {
    download(`/course/${courseId}/group/export/csv/?isActive=true${filterQuery}`, 'groups');
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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getGroups(
        courseId,
        `?isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getGroups(
        courseId,
        `?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text variant="h1">Grupos</Text>
      </Box>
      {groups && (
        <CustomTable<Group>
          checkboxes={false}
          headCells={groupsHeadCells}
          rows={groups}
          isLoading={isLoading}
          deleteIcon={true}
          editIcon={true}
          addButton={{ text: 'Agregar Grupo', addPath: AdminRoutes.addGroup.route }}
          handleEdit={handleEdit}
          handleExportTable={handleExportTable}
          handleDelete={handleDisable}
          exportButton={true}
          pagination={pagination}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </section>
  );
};

export default Groups;
