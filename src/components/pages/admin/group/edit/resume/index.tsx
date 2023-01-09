import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { confirmDelete } from 'src/constants/modal-content';
import { AdminRoutes } from 'src/constants/routes';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { disableGroup, getGroup, getGroups } from 'src/redux/modules/group/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './resume.module.css';

const GroupInfo = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const { group, isLoading, pagination, filterQuery } = useAppSelector((state) => state.group);

  useEffect(() => {
    dispatch(getGroup(courseId, groupId));
    dispatch(getUsersInCourse(courseId, ''));
  }, []);

  const handleDisable = (_id: string) => {
    dispatch(
      openModal(
        confirmDelete({
          entity: 'grupo',
          handleConfirm: () => dispatch(disableGroup(courseId, group?._id)),
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
      {group && (
        <CustomTable<CourseUser>
          checkboxes={false}
          headCells={courseUserWithRoleHeadCells}
          rows={group?.courseUsers}
          isLoading={isLoading}
          deleteIcon={true}
          editIcon={false}
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

export default GroupInfo;
