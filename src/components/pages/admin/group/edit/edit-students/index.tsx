import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { UserFilters } from 'src/components/shared/ui/table/components/filters/user/types';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { invalidForm } from 'src/constants/modal-content';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { Group } from 'src/interfaces/entities/group';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/course-user/actions';
import { getUsersInCourse, getUsersWithoutGroup } from 'src/redux/modules/course-user/thunks';
import { editGroup } from 'src/redux/modules/group/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-tutor.module.css';

const AddStudent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const [selectedObjects, setSelectedObjects] = useState<CourseUser[]>([]);
  const { pagination, courseUsers, isLoading, filterQuery } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );
  const { group } = useAppSelector((state) => state.group);

  useEffect(() => {
    dispatch(
      getUsersWithoutGroup(
        courseId,
        `?isActive=true&role=STUDENT&page=${pagination.page}&limit=${pagination.limit}${filterQuery}&${searchString}`,
      ),
    );
  }, [filterQuery]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const searchString = useMemo(
    () => new URLSearchParams(group?.modules.map((module) => ['modules', module._id])).toString(),
    [group?.modules],
  );

  const students = useMemo(
    () => courseUsers.filter((cUser) => cUser.role === 'STUDENT'),
    [courseUsers],
  );

  const addStudentsGroup = async () => {
    const newArr = group?.courseUsers.concat(selectedObjects);

    if (selectedObjects.length) {
      const response = await dispatch(
        editGroup(courseId, groupId, {
          name: group?.name,
          type: group?.type,
          modules: group?.modules,
          courseUsers: newArr.map((e) => e._id),
          //  group?.courseUsers.push.apply(selectedObjects),
          isActive: group?.isActive,
        }),
      );
      console.log('group', group);
      console.log('first', {
        name: group?.name,
        type: group?.type,
        modules: group?.modules,
        courseUsers: newArr.map((e) => e._id),
        isActive: group?.isActive,
      });
      if ('error' in response.payload && response.payload.error) {
        dispatch(openModal(invalidForm));
      }
    } else return null;
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTORpage=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&role=TUTORpage=${pagination.page}&limit=${parseInt(
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

  return (
    <section data-testid="assign-tutor-container-section">
      <div data-testid="assign-tutor-tittle-div" className={styles.titleContainer}>
        <Text className={styles.margin10} variant="h1">
          Agregar alumnos
        </Text>
        <Text className={styles.margin10} variant="subtitle1">
          Agregar los alumnos del curso
        </Text>
      </div>
      <Box className={styles.container}>
        <CustomTable<CourseUser>
          headCells={courseUserWithRoleHeadCells}
          rows={students}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          filter="group"
          addButton={{
            text: 'Agregar Alumnos',
            startIcon: <GroupAddIcon />,
            onClick: addStudentsGroup,
          }}
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      </Box>
    </section>
  );
};

export default AddStudent;
