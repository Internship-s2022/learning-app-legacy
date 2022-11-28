import React, { useCallback, useEffect } from 'react';

import { Preloader, Table, Text } from 'src/components/shared/ui';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { confirmDelete, genericError } from 'src/constants/modal-content';
import { CourseLong } from 'src/interfaces/entities/course';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { disableByUserId } from 'src/redux/modules/course-user/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './summary.module.css';

const CourseSummary = (): JSX.Element => {
  const { course, isLoading } = useAppSelector((state) => state.course);
  const courseUsers = useAppSelector((state) =>
    state.courseUser.courseUsers.sort((a, b) => (a.role > b.role ? 1 : -1)),
  );
  const { errorData } = useAppSelector((state) => state.courseUser);
  const dispatch = useAppDispatch();

  const handleDisableUser = useCallback(
    (id: string) => {
      dispatch(
        openModal(
          confirmDelete({
            entity: 'usuario del curso',
            handleConfirm: () => {
              const userId = courseUsers.find((courseUser) => courseUser._id === id);
              dispatch(disableByUserId({ course: course?._id, user: userId._id }));
            },
          }),
        ),
      );
    },
    [course?._id, dispatch, courseUsers],
  );

  useEffect(() => {
    if (errorData?.error) {
      dispatch(openModal(genericError));
    }
  }, [errorData]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <section className={styles.container}>
        <section>
          <div>
            <Text variant="h2">Nombre del curso</Text>
            <Text variant="subtitle1">{course?.name}</Text>
          </div>
          <div>
            <Text variant="h2">Tipo de curso</Text>
            <Text variant="subtitle1">{course?.isInternal ? 'Interno' : 'Externo'}</Text>
          </div>
          <div>
            <Text variant="h2">Duración</Text>
            <Text variant="subtitle1">
              {(course?.type as CourseLong) === 'EXPRESS' ? 'Express' : 'Full'}
            </Text>
          </div>
        </section>
        <section>
          <div>
            <Text variant="h2">Descripción del curso</Text>
            <Text variant="subtitle1">{course?.description}</Text>
          </div>
        </section>
      </section>
      <Table<CourseUser>
        headCells={courseUserWithRoleHeadCells}
        rows={courseUsers}
        pagination={{
          totalDocs: courseUsers.length,
          limit: 100,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        }}
        disableToolbar
        deleteIcon
        handleDelete={handleDisableUser}
        checkboxes={false}
        editIcon={false}
        exportButton={false}
        handleChangePage={() => undefined}
        handleChangeRowsPerPage={() => undefined}
      />
    </>
  );
};

export default CourseSummary;
