import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { CourseFilters } from 'src/components/shared/ui/table/components/filters/course/types';
import { mainHeadCells } from 'src/constants/head-cells';
import { cannotShowList, genericError } from 'src/constants/modal-content';
import { StudentReport } from 'src/interfaces/entities/report';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/report/actions';
import { editReportById, getReportsByModuleId } from 'src/redux/modules/report/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertArrayToQuery, download } from 'src/utils/export-csv';
import { convertDatatoExams, convertModuleReports } from 'src/utils/formatters';
import { getReportsFormattedAndHeadCells } from 'src/utils/generate-dynamic-head-cell';

const ModuleReport = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, moduleId } = useParams();
  const { reportsByModule, isLoading, pagination, filterQuery, errorData } = useAppSelector(
    (state: RootReducer) => state.report,
  );
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [exams, setExams] = useState([]);

  const handleRefresh = useCallback(
    (
      _event?: React.ChangeEvent<HTMLInputElement>,
      options?: { newPage?: number; newLimit?: number } | undefined,
    ) => {
      dispatch(
        getReportsByModuleId(
          courseId,
          moduleId,
          `&page=${options?.newPage || pagination.page}&limit=${
            options?.newLimit || pagination.limit
          }${filterQuery}`,
        ),
      );
    },
    [courseId, dispatch, filterQuery, moduleId, pagination.limit, pagination.page],
  );

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, filterQuery, moduleId]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'reportes' })));
    }
  }, [dispatch, errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [dispatch],
  );

  const convertedReports: StudentReport[] = useMemo(
    () => convertModuleReports(reportsByModule),
    [reportsByModule],
  );

  const { examsHeadCells, mappedExams } = useMemo(
    () => getReportsFormattedAndHeadCells(reportsByModule, true),
    [reportsByModule],
  );

  const dynamicHeadCells = [...mainHeadCells, ...examsHeadCells];

  const onUpdateExams = () => {
    const examsToSend = exams.filter((exam) => selectedObjects.some((obj) => obj._id == exam._id));
    dispatch(
      openModal({
        title: 'Subir notas',
        description:
          examsToSend.length === exams.length
            ? '¿Está seguro que desea subir las notas seleccionadas?'
            : '¿Está seguro que desea subir las notas seleccionadas? Las notas ingresadas sin seleccionar se perderán.',
        type: 'confirm',
        handleConfirm: async () => {
          const response = await dispatch(editReportById(courseId, moduleId, examsToSend));
          if (response.payload && 'error' in response.payload) {
            dispatch(openModal(genericError));
          } else {
            setSelectedObjects([]);
            setExams([]);
          }
        },
      }),
    );
  };

  const onInputChange = (data) => {
    const dataConverted = convertDatatoExams(data, mappedExams);
    const examIndex = exams.findIndex((exam) => exam._id === data.row._id);
    if (examIndex === -1) {
      setExams([...exams, dataConverted]);
    } else {
      setExams(exams.map((exam, index) => (index === examIndex ? dataConverted : exam)));
    }
  };

  const handleExportSelection = async (_ids: string[]) => {
    const selectedReports = convertedReports.reduce((prev: string[], item) => {
      if (_ids.includes(item._id)) {
        prev = [...prev, item._id];
      }
      return prev;
    }, []);
    await download(
      `/course/${courseId}/report/module/${moduleId}/export/csv?courseUser.role=STUDENT&courseUser.isActive=true&` +
        `${convertArrayToQuery(selectedReports)}`,
      selectedObjects.length === reportsByModule.length
        ? 'module-reports'
        : 'selected-module-reports',
    );
  };

  const handleExportTable = async () => {
    await download(
      `/course/${courseId}/report/module/${moduleId}/export/csv?courseUser.role=STUDENT&courseUser.isActive=true${filterQuery}`,
      'module-reports',
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    handleRefresh(undefined, { newPage: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefresh(undefined, { newLimit: parseInt(event.target.value, 10) });
  };

  return (
    <Box>
      {errorData.error && errorData.status != 404 ? (
        <div data-testid="list-module-reports-title-container-div-error">
          <Text variant="h2">Hubo un error al cargar la tabla de reportes.</Text>
        </div>
      ) : (
        <CustomTable<StudentReport>
          key="report"
          headCells={dynamicHeadCells}
          addButton={{
            text: exams.length <= 1 ? 'Subir nota' : 'Subir notas',
            onClick: onUpdateExams,
            disabled: !selectedObjects.length || !exams.length,
            startIcon: <ArrowUpwardIcon />,
          }}
          rows={convertedReports}
          onInputChange={onInputChange}
          isLoading={isLoading}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          deleteIcon={false}
          editIcon={false}
          exportButton={true}
          pagination={pagination}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filter="student"
          onFiltersSubmit={onFiltersSubmit}
          editableProp="grade"
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
          handleRefresh={handleRefresh}
        />
      )}
    </Box>
  );
};

export default ModuleReport;
