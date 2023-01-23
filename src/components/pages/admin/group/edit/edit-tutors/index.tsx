import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { isArrayEqual } from 'src/utils/arrays-comparator';

import styles from './add-tutor.module.css';

const EditTutor = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, groupId } = useParams();
  const { pagination, isLoading, filterQuery } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );
  const tutors = useAppSelector(
    (state) => state.courseUser?.courseUsers?.filter((user) => user.role === 'TUTOR') ?? [],
  );
  const { group, isLoading: isLoadingGroup } = useAppSelector((state) => state.group);
  const [selectedTutors, setSelectedTutors] = useState<CourseUser[]>(
    group?.courseUsers?.filter((e) => e.role === 'TUTOR') || [],
  );
  const isEqual = useMemo(
    () =>
      isArrayEqual(
        selectedTutors,
        group?.courseUsers?.filter((e) => e.role === 'TUTOR'),
      ),
    [group?.courseUsers, selectedTutors],
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsersInCourse(
          courseId,
          `?isActive=true&role=TUTOR&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page],
  );

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, filterQuery]);

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
          courseUsers: group?.courseUsers
            .filter((e) => e.role == 'STUDENT')
            .concat(selectedTutors)
            .map((e) => e._id),
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
        <Text variant="h1">Cambiar tutor</Text>
        <Text className={styles.subtitle} variant="subtitle1">
          Selecciona el tutor del grupo
        </Text>
        <Text
          className={styles.validation}
          variant="subtitle2"
          color={selectedTutors.length === 1 ? 'info' : 'error'}
        >
          Debe haber un único tutor.
        </Text>
      </Box>
      <Box className={styles.tableContainer}>
        <CustomTable<CourseUser>
          headCells={courseUserWithoutRoleHeadCells}
          rows={tutors}
          isLoading={isLoading || isLoadingGroup}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          filter="userGroup"
          addButton={{
            text: 'Cambiar Tutor',
            startIcon: <GroupAddIcon />,
            onClick: changeTutorGroup,
            disabled: !(selectedTutors.length === 1) || isEqual,
          }}
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedTutors}
          setSelectedObjects={handlePressTutor}
          handleRefresh={handleRefresh}
        />
      </Box>
    </section>
  );
};

export default EditTutor;
