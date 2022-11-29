import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseFilters } from 'src/components/shared/ui/table/components/filters/course/types';
import { adminCourseHeadCells } from 'src/constants/head-cells';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { resetQuery, setQuery } from 'src/redux/modules/course-user/actions';
import { disableByUserId, getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { download } from 'src/utils/export-csv';

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
  let role: string;

  if (authenticated?.userType === 'NORMAL') {
    role = userInfo?.courses.find((course) => course.course._id === courseId)?.role;
    switch (role) {
      case 'ADMIN':
        role = 'Administrador';
        break;
      case 'TUTOR':
        role = 'Tutor';
        break;
      case 'STUDENT':
        role = 'Alumno';
        break;
      case 'AUXILIARY':
        role = 'Auxiliar';
        break;
      default:
        break;
    }
  } else {
    role = 'Super admin';
  }

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery, location.pathname]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(
        openModal({
          title: 'Ocurrió un error',
          description: 'No se puede mostrar la lista de usuarios, intente nuevamente.',
          type: 'alert',
        }),
      );
    }
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const validateRequiredRoles = (role: string) => {
    const roles = courseUsers?.filter((item) => item.role === role);
    return roles.length === 1;
  };

  const handleDisable = (_id: string) => {
    const {
      user: { _id: userToDisable },
      role,
    } = courseUsers.find((cu) => cu._id === _id);
    let isRequired;
    if (role === 'ADMIN' || role === 'TUTOR') {
      isRequired = validateRequiredRoles(role);
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
          description: '¿Está seguro que desea deshabilitar a este usuario?',
          type: 'confirm',
          handleConfirm: () => {
            dispatch(disableByUserId({ course: courseId, user: userToDisable }));
          },
        }),
      );
    }
  };

  const handleExportSelection = (_ids: string[]) => {
    const mappedString = _ids.map((e) => `includeIds=${e}&`);
    const queryString = mappedString.toString().replaceAll(',', '').slice(0, -1);
    download(
      `/course-user/export-by-course/csv/${courseId + '?' + queryString}`,
      'selected-course-users',
    );
  };

  const handleExportTable = () => {
    download(
      `/course-user/export-by-course/csv/${courseId}?isActive=true${filterQuery}`,
      'course-users',
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          <Text>ROL</Text>
          <Text variant="h3">{role}</Text>
        </div>
        <div>
          <Text>INICIO DEL CURSO</Text>
          <Text variant="h3">{course?.startDate.slice(0, 10)}</Text>
        </div>
        <div>
          <Text>FIN DEL CURSO</Text>
          <Text variant="h3">{course?.endDate.slice(0, 10)}</Text>
        </div>
      </div>
      <div className={styles.description}>
        <Text variant="h1">Descripción del curso</Text>
        <Text variant="h3" className={styles.subtitle}>
          {course?.description}
        </Text>
      </div>
      <Text variant="h2" className={styles.tableTitle}>
        Usuarios
      </Text>
      <div>
        {errorData.error && errorData.status != 404 ? (
          <div className={styles.titleContainer}>
            <Text variant="h2">Hubo un error al cargar la tabla de usuarios.</Text>
          </div>
        ) : (
          <CustomTable<CourseUser>
            headCells={adminCourseHeadCells}
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
          />
        )}
      </div>
    </section>
  );
};

export default AdminCourse;
