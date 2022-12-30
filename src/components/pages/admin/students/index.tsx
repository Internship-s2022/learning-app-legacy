import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseFilters } from 'src/components/shared/ui/table/components/filters/course/types';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { studentHeadCells } from 'src/constants/head-cells';
import { cannotShowList } from 'src/constants/modal-content';
import { ModuleType } from 'src/interfaces/entities/module';
import { Report } from 'src/interfaces/entities/report';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getCourseById } from 'src/redux/modules/course/thunks';
import { disableByUserId } from 'src/redux/modules/course-user/thunks';
import { getModules } from 'src/redux/modules/module/thunks';
import { resetQuery, setQuery } from 'src/redux/modules/report/actions';
import { getReportsByCourseId } from 'src/redux/modules/report/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';
import { mapReports } from 'src/utils/formatters';

import styles from './admin-students.module.css';

const Students = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { reportsByCourse, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.report,
  );
  const { modules, isLoading: isLoadingModules } = useAppSelector(
    (state: RootReducer) => state.module,
  );
  const [selectedObjects, setSelectedObjects] = useState<Report[]>([]);
  const defaultModules: Record<string, string> = useMemo(
    () =>
      modules.reduce((prev, mod) => {
        return { ...prev, [mod.name]: ' -- | -- ' };
      }, {}),
    [modules],
  );

  const dataConverted = useMemo(
    () => mapReports(reportsByCourse, defaultModules),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reportsByCourse, modules],
  );
  const newPagination = {
    ...pagination,
    totalDocs: dataConverted ? dataConverted.length : 0,
  };

  useEffect(() => {
    dispatch(getCourseById(courseId));
    dispatch(
      getModules(courseId, `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
    dispatch(
      getReportsByCourseId(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'alumnos' })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
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
    dispatch(
      openModal({
        title: 'Deshabilitar alumno del curso.',
        description: '¿Está seguro que desea deshabilitar a este alumno?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableByUserId({ course: courseId, user: _id }, true));
        },
      }),
    );
  };

  const handleExportSelection = (_ids: string[]) => {
    const selectedReports = dataConverted.reduce((prev: string[], item) => {
      if (_ids.includes(item._id)) {
        prev = [...prev, ...item.reportId];
      }
      return prev;
    }, []);
    download(
      `/course/${courseId}/report/export/csv?courseUser.isActive=true&` +
        `${convertArrayToQuery(selectedReports)}`,
      'selected-students',
    );
  };

  const handleExportTable = () => {
    download(
      `/course/${courseId}/report/export/csv?courseUser.isActive=true${filterQuery}`,
      'students',
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const generateDynamicHeadCell = () => {
    if (modules?.length) {
      return modules?.reduce((prev: HeadCell[] = [], obj: ModuleType, index) => {
        prev[index] = {
          id: obj.name,
          numeric: false,
          disablePadding: false,
          label: obj.name,
          subLabel: 'Nota | Asistencia',
        };
        return prev;
      }, []);
    } else {
      return [];
    }
  };

  const dynamicHeadCells = useMemo(
    () => [...studentHeadCells, ...generateDynamicHeadCell()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modules],
  );

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
          <CustomTable<Report>
            headCells={dynamicHeadCells}
            rows={dataConverted}
            isLoading={isLoading || isLoadingModules}
            pagination={newPagination}
            deleteIcon={true}
            editIcon={false}
            addButton={{ text: 'Agregar alumno', addPath: `/admin/course/${courseId}/postulants` }}
            exportButton={true}
            filter="student"
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
