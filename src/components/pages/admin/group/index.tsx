import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { groupsHeadCells } from 'src/constants/head-cells';
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
      dispatch(getGroups(courseId, '?isActive=true'));
    }
  }, [groups]);

  const handleEdit = (_id: string) => {
    navigate(`edit?view=${_id}`);
  };

  const handleExportTable = () => {
    download(`/course/${courseId}/group/export/csv/?isActive=true${filterQuery}`, 'groups');
  };

  const handleDisable = (_id: string) => {
    const group = groups.find((group) => group._id === _id);
    dispatch(
      openModal({
        title: 'Deshabilitar grupo del curso.',
        description: '¿Está seguro que desea deshabilitar a este grupo?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableGroup(courseId, group._id));
        },
      }),
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
          handleEdit={handleEdit}
          handleExportTable={handleExportTable}
          handleDelete={handleDisable}
          exportButton={true}
          customIconText="Ver"
          pagination={{ ...pagination, totalDocs: groups?.length }}
          handleChangePage={() => undefined}
          handleChangeRowsPerPage={() => undefined}
        />
      )}
    </section>
  );
};

export default Groups;
