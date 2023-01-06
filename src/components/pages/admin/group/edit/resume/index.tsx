import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery } from 'src/redux/modules/admission-test/actions';
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { getGroup, getGroups } from 'src/redux/modules/group/thunks';

import styles from './resume.module.css';

const GroupInfo = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedObjects, setSelectedObjects] = useState<CourseUser[]>([]);
  const { courseId, groupId } = useParams();
  const { group, pagination, isLoading, filterQuery } = useAppSelector((state) => state.group);

  useEffect(() => {
    dispatch(getGroup(courseId, groupId));
    dispatch(getUsersInCourse(courseId, ''));
  }, []);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

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
      {group && (
        <CustomTable<CourseUser>
          checkboxes={false}
          headCells={courseUserWithRoleHeadCells}
          rows={group?.courseUsers}
          isLoading={isLoading}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          pagination={{
            totalDocs: group?.courseUsers?.length,
            limit: 100,
            totalPages: 1,
            page: 1,
            pagingCounter: 1,
            hasPrevPage: false,
            hasNextPage: false,
            prevPage: null,
            nextPage: null,
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      )}
    </section>
  );
};

export default GroupInfo;
