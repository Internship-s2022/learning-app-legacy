import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseUserWithoutRoleHeadCells } from 'src/constants/head-cells';
import { invalidForm } from 'src/constants/modal-content';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/course-user/actions';
import { getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { editGroup } from 'src/redux/modules/group/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-tutor.module.css';

const EditTutor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const { pagination, courseUsers, isLoading, filterQuery } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );
  const [newTutors, setNewTutors] = useState<CourseUser[]>();
  console.log('courseId', courseId);
  const { group } = useAppSelector((state) => state.group);
  const [selectedTutors, setSelectedTutors] = useState<CourseUser[]>(
    group?.courseUsers?.filter((e) => e.role === 'TUTOR'),
  );

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  useEffect(() => {
    const newArr = group?.courseUsers.filter((e) => e.role == 'STUDENT');
    setNewTutors(newArr.concat(selectedTutors));
  }, [selectedTutors]);

  useEffect(() => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTOR&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery]);

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTOR&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTOR&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handlePressTutor = (courseUsers: CourseUser[]) => {
    setSelectedTutors(courseUsers);
  };

  const changeTutorGroup = async () => {
    if (selectedTutors.length) {
      const response = await dispatch(
        editGroup(courseId, groupId, {
          name: group?.name,
          type: group?.type,
          modules: group?.modules.map((e) => e._id),
          courseUsers: newTutors.map((e) => e._id),
          isActive: group?.isActive,
        }),
      );
      if ('error' in response.payload) {
        dispatch(openModal(invalidForm));
      }
    }
  };

  return (
    <section data-testid="assign-tutor-container-section" className={styles.container}>
      <Box data-testid="assign-tutor-tittle-Box" className={styles.titleContainer}>
        <Text variant="h1">Asignar tutores</Text>
        <Text className={styles.subtitle} variant="subtitle1">
          Selecciona el tutor del grupo
        </Text>
        <Text
          className={styles.margin15}
          variant="subtitle2"
          color={selectedTutors.length === 1 ? 'info' : 'error'}
        >
          Se debe seleccionar un tutor.
        </Text>
      </Box>
      <Box className={styles.tableContainer}>
        <CustomTable<CourseUser>
          headCells={courseUserWithoutRoleHeadCells}
          rows={courseUsers}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          filter="group"
          addButton={{
            text: 'Cambiar Tutor',
            startIcon: <GroupAddIcon />,
            onClick: changeTutorGroup,
            disabled: !(selectedTutors.length === 1),
          }}
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedTutors}
          setSelectedObjects={handlePressTutor}
        />
      </Box>
    </section>
  );
};

export default EditTutor;
