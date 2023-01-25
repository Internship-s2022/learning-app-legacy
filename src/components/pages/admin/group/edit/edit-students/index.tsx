import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/course-user/actions';
import { getUsersWithoutGroup } from 'src/redux/modules/course-user/thunks';
import { editGroup } from 'src/redux/modules/group/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-student.module.css';

const AddStudent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const [selectedObjects, setSelectedObjects] = useState<CourseUser[]>([]);
  const {
    pagination,
    isLoading: isLoadingCU,
    filterQuery,
  } = useAppSelector((state: RootReducer) => state.courseUser);
  const { group, isLoading } = useAppSelector((state) => state.group);
  const students = useAppSelector(
    (state) => state.courseUser?.courseUsers?.filter((user) => user.role === 'STUDENT') || [],
  );

  const searchString = useMemo(
    () => new URLSearchParams(group?.modules?.map((module) => ['modules', module._id])).toString(),
    [group?.modules],
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsersWithoutGroup(
          courseId,
          `?isActive=true&role=STUDENT&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}&${searchString}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page, searchString],
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, filterQuery, searchString]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const addStudentsGroup = async () => {
    if (selectedObjects.length) {
      const response = await dispatch(
        editGroup(courseId, groupId, {
          name: group?.name,
          type: group?.type,
          modules: group?.modules?.map((e) => e._id),
          courseUsers: group?.courseUsers?.concat(selectedObjects).map((e) => e._id),
          isActive: group?.isActive,
        }),
      );
      if ('error' in response.payload) {
        dispatch(openModal(invalidForm));
      }
      handleRefresh();
      setSelectedObjects([]);
    }
  };

  const onFiltersSubmit: SubmitHandler<Partial<UserFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (_event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  return (
    <section data-testid="assign-tutor-container-section" className={styles.container}>
      <Box data-testid="assign-tutor-tittle-div" className={styles.titleContainer}>
        <Text variant="h1">Agregar alumnos</Text>
        <Text className={styles.subtitle} variant="subtitle1">
          Agregar los alumnos disponibles que formaran parte del grupo
        </Text>
      </Box>
      <CustomTable<CourseUser>
        headCells={courseUserWithRoleHeadCells}
        rows={students}
        isLoading={isLoading || isLoadingCU}
        pagination={pagination}
        deleteIcon={false}
        editIcon={false}
        exportButton={false}
        filter="userGroup"
        addButton={{
          text: 'Agregar Alumnos',
          startIcon: <GroupAddIcon />,
          onClick: addStudentsGroup,
          disabled: !(selectedObjects.length >= 1),
        }}
        onFiltersSubmit={onFiltersSubmit}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        selectedObjects={selectedObjects}
        setSelectedObjects={setSelectedObjects}
        handleRefresh={handleRefresh}
      />
    </section>
  );
};

export default AddStudent;
