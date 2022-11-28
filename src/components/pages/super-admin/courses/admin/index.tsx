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
  const [selectedObjects, setSelectedObjects] = useState<CourseUser[]>([]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(
      getUsersInCourse(
        courseId,
        `?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery]);

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

  const handleDisable = (_id: string) => {
    const userToDisable = courseUsers.find((cu) => cu._id === _id).user._id;
    dispatch(
      openModal({
        title: 'Desabilitar usuario del curso.',
        description: '¿Está seguro que desea desabilitar a este usuario?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableByUserId({ course: courseId, user: userToDisable }));
        },
      }),
    );
  };

  const handleExportSelection = (_ids: string[]) => {
    alert(`Selection (${_ids.length} items): ${_ids}`);
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
          {/* TO-DO <Text>userInfo.role</Text> */}
          <Text variant="h3">Administrador</Text>
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
        {courseUsers && (
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
