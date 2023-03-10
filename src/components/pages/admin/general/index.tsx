import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseFilters } from 'src/components/shared/ui/table/components/filters/course/types';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { resetQuery, setQuery } from 'src/redux/modules/course-user/actions';
import { disableByUserId, getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';
import { getRoleLabel } from 'src/utils/formatters';

import styles from './admin-course.module.css';

const AdminCourse = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const { courseUsers, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.courseUser,
  );
  const { userInfo, authenticated } = useAppSelector((state: RootReducer) => state.auth);
  const [selectedObjects, setSelectedObjects] = useState<CourseUser[]>([]);
  const userCourse = useMemo(
    () => userInfo?.courses.find((course) => course.course._id === courseId),
    [userInfo?.courses, courseId],
  );

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getUsersInCourse(
          courseId,
          `?isActive=true&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, pagination.limit, pagination.page],
  );

  useEffect(() => {
    dispatch(getCourseById(courseId));
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery, courseId]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(
        openModal({
          title: 'Ocurri?? un error',
          description: 'No se puede mostrar la lista de usuarios, intente nuevamente.',
          type: 'alert',
        }),
      );
    }
  }, [dispatch, errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = useCallback(
    (data: Record<string, string>) => {
      const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
      dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
    },
    [dispatch],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  const handleDisable = (_id: string) => {
    const {
      user: { _id: userToDisable },
      role,
    } = courseUsers.find((cu) => cu._id === _id);
    let isRequired;
    if (role === 'ADMIN' || role === 'TUTOR') {
      const roles = courseUsers?.filter((item) => item.role === role);
      isRequired = roles.length === 1;
    }
    if (isRequired) {
      dispatch(
        openModal({
          title: 'Este usuario no puede ser deshabilitado.',
          description: 'Se requiere al menos un tutor y administrador por curso.',
          type: 'alert',
        }),
      );
    } else {
      dispatch(
        openModal({
          title: 'Deshabilitar usuario del curso.',
          description: '??Est?? seguro que desea deshabilitar a este usuario?',
          type: 'confirm',
          handleConfirm: () => {
            dispatch(disableByUserId({ course: courseId, user: userToDisable }));
          },
        }),
      );
    }
  };

  const handleExportSelection = async (_ids: string[]) => {
    await download(
      `/course-user/export-by-course/csv/${courseId + '?' + convertArrayToQuery(_ids)}`,
      selectedObjects.length === courseUsers.length ? 'course-users' : 'selected-course-users',
    );
  };

  const handleExportTable = async () => {
    await download(
      `/course-user/export-by-course/csv/${courseId}?isActive=true${filterQuery}`,
      'course-users',
    );
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          <Text variant="body2" fontWeight="400">
            ROL
          </Text>
          <Text variant="body2" fontWeight="600">
            {getRoleLabel(userCourse?.role, authenticated?.userType)}
          </Text>
        </div>
        <div>
          <Text variant="body2" fontWeight="400">
            INICIO DEL CURSO
          </Text>
          <Text variant="body2" fontWeight="600">
            {course?.startDate.slice(0, 10)}
          </Text>
        </div>
        <div>
          <Text variant="body2" fontWeight="400">
            FIN DEL CURSO
          </Text>
          <Text variant="body2" fontWeight="600">
            {course?.endDate.slice(0, 10)}
          </Text>
        </div>
      </div>
      <div className={styles.description}>
        <Text variant="h1">Descripci??n del curso</Text>
        <Text variant="subtitle2" className={styles.subtitle}>
          {course?.description}
        </Text>
      </div>
      <Text variant="subtitle2" className={styles.tableTitle}>
        Usuarios
      </Text>
      <div>
        {errorData.error && errorData.status != 404 ? (
          <div className={styles.titleContainer}>
            <Text variant="subtitle2">Hubo un error al cargar la tabla de usuarios.</Text>
          </div>
        ) : (
          <CustomTable<CourseUser>
            headCells={courseUserWithRoleHeadCells}
            rows={courseUsers}
            isLoading={isLoading}
            pagination={pagination}
            deleteIcon={true}
            editIcon={false}
            exportButton={true}
            filter="adminCourseUser"
            handleDelete={handleDisable}
            onFiltersSubmit={onFiltersSubmit}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleExportSelection={handleExportSelection}
            handleExportTable={handleExportTable}
            selectedObjects={selectedObjects}
            setSelectedObjects={setSelectedObjects}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
    </section>
  );
};

export default AdminCourse;
