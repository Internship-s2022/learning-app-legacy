import React, { useCallback, useEffect } from 'react';

import { Table, Text } from 'src/components/shared/ui';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { confirmDelete, genericError, invalidForm } from 'src/constants/modal-content';
import { CourseLong } from 'src/interfaces/entities/course';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { disableByUserId } from 'src/redux/modules/course-user/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { getRoleLabel } from 'src/utils/formatters';

import styles from './summary.module.css';

const CourseSummary = (): JSX.Element => {
  const { course } = useAppSelector((state) => state.course);
  const courseUsers = useAppSelector((state) =>
    state.courseUser.courseUsers.sort((a, b) => (a.role > b.role ? 1 : -1)),
  );
  const { errorData, isLoading } = useAppSelector((state) => state.courseUser);
  const dispatch = useAppDispatch();

  const handleDisableUser = useCallback(
    (id: string) => {
      const courseUser = courseUsers.find((courseUser) => courseUser._id === id);
      if (
        courseUser.role === 'AUXILIARY' ||
        courseUsers.filter((cUser) => cUser.role === courseUser.role).length > 1
      ) {
        dispatch(
          openModal(
            confirmDelete({
              entity: 'usuario del curso',
              handleConfirm: () => {
                dispatch(disableByUserId({ course: course?._id, user: courseUser?.user?._id }));
              },
            }),
          ),
        );
      } else {
        dispatch(
          openModal({
            ...invalidForm,
            description: `Debe haber al menos un usuario con el rol de ${getRoleLabel(
              courseUser.role,
              'NORMAL',
            ).toLowerCase()}.`,
          }),
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, courseUsers],
  );

  useEffect(() => {
    if (errorData?.error) {
      dispatch(openModal(genericError));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData]);

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
            <Text variant="subtitle1" className={styles.description}>
              {course?.description}
            </Text>
          </div>
        </section>
      </section>
      {errorData.error && errorData.status != 404 ? (
        <div className={styles.titleContainer}>
          <Text variant="h2">Hubo un error al cargar la tabla de usuarios.</Text>
        </div>
      ) : (
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
          showPagination={false}
          disableToolbar
          deleteIcon
          isLoading={isLoading}
          handleDelete={handleDisableUser}
          checkboxes={false}
          editIcon={false}
          exportButton={false}
          handleChangePage={() => undefined}
          handleChangeRowsPerPage={() => undefined}
        />
      )}
    </>
  );
};

export default CourseSummary;
