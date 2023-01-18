import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { groupHeadCells } from 'src/constants/head-cells';
import { confirmDelete } from 'src/constants/modal-content';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery } from 'src/redux/modules/admission-test/actions';
import { editGroup, getGroup } from 'src/redux/modules/group/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { sortByRole } from 'src/utils/sort';

import styles from './resume.module.css';

const GroupInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedObjects, setSelectedObjects] = useState<CourseUser[]>([]);
  const { courseId, groupId } = useParams();
  const { group, isLoading } = useAppSelector((state) => state.group);
  const groupUsers = useAppSelector((state) => sortByRole(state.group?.group?.courseUsers));

  useEffect(() => {
    dispatch(getGroup(courseId, groupId));
  }, [courseId, dispatch, groupId]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const handleDelete = (_id: string) => {
    const courseUsers = group.courseUsers.reduce((acum, cUser) => {
      if (cUser._id !== _id) return [...acum, cUser._id];
      return acum;
    }, []);
    dispatch(
      openModal(
        confirmDelete({
          entity: 'usuario',
          handleConfirm: () =>
            dispatch(
              editGroup(courseId, groupId, {
                name: group.name,
                type: group.type,
                modules: group.modules.map((e) => e._id),
                courseUsers: courseUsers,
                isActive: group.isActive,
              }),
            ),
        }),
      ),
    );
  };

  return (
    <section className={styles.container}>
      <Box className={styles.textContainer}>
        <Text className={styles.h1} variant="h1">
          Grupos
        </Text>
        <Box className={styles.typeAndName}>
          <Box>
            <Text className={styles.margin10}>Nombre de grupo</Text>
            <Text variant="h2">{group?.name}</Text>
          </Box>
          <Box>
            <Text className={styles.margin10}>Tipo de grupo</Text>
            <Text variant="h2">{group?.type}</Text>
          </Box>
        </Box>
        <Text color="info">Módulos asignados</Text>
        <Box className={styles.moduleInfoContainer}>
          {group?.modules.map((e) => (
            <Box className={styles.moduleChip} key={e.name}>
              <Text key={e.name} color="admin.contrastText">
                {e.name}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
      <CustomTable<CourseUser>
        checkboxes={false}
        headCells={groupHeadCells}
        rows={groupUsers}
        isLoading={isLoading}
        deleteIcon
        editIcon={false}
        exportButton={false}
        disableToolbar
        pagination={{
          totalDocs: groupUsers.length,
          limit: 100,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        }}
        handleDelete={handleDelete}
        handleChangePage={() => ({})}
        handleChangeRowsPerPage={() => ({})}
        selectedObjects={selectedObjects}
        setSelectedObjects={setSelectedObjects}
      />
    </section>
  );
};

export default GroupInfo;
