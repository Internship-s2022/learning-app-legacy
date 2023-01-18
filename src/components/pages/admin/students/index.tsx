import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseFilters } from 'src/components/shared/ui/table/components/filters/course/types';
import { cannotShowList } from 'src/constants/modal-content';
import { GroupStudentReport, MapGroupStudentReport } from 'src/interfaces/entities/report';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { disableByUserId, getUsersInCourse } from 'src/redux/modules/course-user/thunks';
import { getModules } from 'src/redux/modules/module/thunks';
import { resetQuery, setQuery } from 'src/redux/modules/report/actions';
import { getReportsByCourseId } from 'src/redux/modules/report/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';
import { getCourseStudentReportsHeadCells } from 'src/utils/generate-dynamic-head-cell';

import styles from './admin-students.module.css';

const formatReport = (reports: GroupStudentReport[]) => {
  return reports?.reduce((prevStudent: MapGroupStudentReport[] = [], student) => {
    const reports = student.reports.reduce((prev, report) => {
      return {
        ...prev,
        [report.module.toString()]: {
          reportId: report._id,
          value: (
            <span className={styles.reportCell}>
              {report.exams.map((exam) => `${exam.grade === 10 ? exam.grade : '0' + exam.grade} |`)}
              {report.assistance ? (
                <CheckIcon fontSize="small" color="secondary" />
              ) : (
                <CloseIcon fontSize="small" color="primary" />
              )}
            </span>
          ),
        },
      };
    }, {});

    return [...prevStudent, { ...student, reports }];
  }, []);
};

const Students = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const reportsByCourse = useAppSelector((state) => formatReport(state.report.reportsByCourse));
  const { errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.report,
  );
  const { modules, isLoading: isLoadingModules } = useAppSelector(
    (state: RootReducer) => state.module,
  );
  const { courseUsers } = useAppSelector((state: RootReducer) => state.courseUser);
  const [selectedObjects, setSelectedObjects] = useState<MapGroupStudentReport[]>([]);

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(getModules(courseId, ''));
    dispatch(getUsersInCourse(courseId, '?role=STUDENT&limit=1000'));
  }, [courseId, dispatch]);

  useEffect(() => {
    dispatch(
      getReportsByCourseId(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [courseId, dispatch, filterQuery, pagination.limit, pagination.page]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'alumnos' })));
    }
  }, [dispatch, errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getReportsByCourseId(
        courseId,
        `&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getReportsByCourseId(
        courseId,
        `&page=${pagination.page}&limit=${parseInt(event.target.value, 10)}${filterQuery}`,
      ),
    );
  };

  const handleDisable = (_id: string) => {
    const cUser = courseUsers.find((cUser) => cUser._id === _id);
    dispatch(
      openModal({
        title: 'Deshabilitar alumno del curso.',
        description: '¿Está seguro que desea deshabilitar a este alumno?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableByUserId({ course: courseId, user: cUser?.user?._id }, true));
        },
      }),
    );
  };

  const handleExportSelection = async (ids: string[]) => {
    const selectedReports = reportsByCourse.reduce((students: string[], student) => {
      if (ids.includes(student._id)) {
        students = [...students, student._id];
      }
      return students;
    }, []);
    await download(
      `/course/${courseId}/report/export/csv?courseUser.isActive=true&` +
        `${convertArrayToQuery(selectedReports, 'studentIds')}`,
      selectedObjects.length === reportsByCourse.length ? 'students' : 'selected-students',
    );
  };

  const handleExportTable = async () => {
    await download(
      `/course/${courseId}/report/export/csv?courseUser.isActive=true${filterQuery}`,
      'students',
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const dynamicHeadCells = useMemo(() => getCourseStudentReportsHeadCells(modules), [modules]);

  return (
    <section className={styles.container}>
      <Box className={styles.description}>
        <Text variant="h1">Alumnos</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Lista de todos los alumnos pertenecientes al curso.
        </Text>
      </Box>
      <Box>
        {errorData.error && errorData.status != 404 ? (
          <Box className={styles.titleContainer}>
            <Text variant="subtitle2">Hubo un error al cargar la tabla de alumnos.</Text>
          </Box>
        ) : (
          <CustomTable<MapGroupStudentReport>
            headCells={dynamicHeadCells}
            rows={reportsByCourse}
            isLoading={isLoading || isLoadingModules}
            pagination={pagination}
            deleteIcon={true}
            editIcon={false}
            addButton={{ text: 'Agregar alumno', addPath: `/admin/course/${courseId}/postulants` }}
            exportButton={true}
            filter="studentCourse"
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
      </Box>
    </section>
  );
};

export default Students;
