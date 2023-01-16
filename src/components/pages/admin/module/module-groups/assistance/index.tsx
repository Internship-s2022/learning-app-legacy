import React, { useEffect, useMemo, useState } from 'react';
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

const ModuleAssistance = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, moduleId } = useParams();
  const { reportsByModule, isLoading, pagination, filterQuery, errorData } = useAppSelector(
    (state: RootReducer) => state.report,
  );
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [dataToSend, setDataToSend] = useState([]);

  useEffect(() => {
    dispatch(
      getReportsByModuleId(
        courseId,
        moduleId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [courseId, moduleId, filterQuery, dispatch, pagination.page, pagination.limit]);

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

  const { mappedExams } = useMemo(
    () => getReportsFormattedAndHeadCells(reportsByModule, true),
    [reportsByModule],
  );

  const assistanceHeadCells = [
    {
      id: 'assistance',
      numeric: false,
      disablePadding: false,
      label: 'Asistencia',
      boolean: true,
    },
  ];

  const dynamicHeadCells = [...mainHeadCells, ...assistanceHeadCells];

  const onUpdateAssistance = () => {
    const data = dataToSend.filter((d) => selectedObjects.some((obj) => obj._id == d._id));
    dispatch(
      openModal({
        title: 'Subir asistencias',
        description:
          selectedObjects.length === data.length
            ? '¿Está seguro que desea subir las asistencias seleccionadas?'
            : '¿Está seguro que desea subir las asistencias seleccionadas? Las asistencias ingresadas sin seleccionar se perderán.',
        type: 'confirm',
        handleConfirm: async () => {
          const response = await dispatch(editReportById(courseId, moduleId, data));
          if (response.payload && 'error' in response.payload) {
            dispatch(openModal(genericError));
          } else {
            setSelectedObjects([]);
            setDataToSend([]);
          }
        },
      }),
    );
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

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getReportsByModuleId(
        courseId,
        moduleId,
        `&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getReportsByModuleId(
        courseId,
        moduleId,
        `&page=${pagination.page}&limit=${parseInt(event.target.value, 10)}${filterQuery}`,
      ),
    );
  };

  const onFiltersSubmit: SubmitHandler<Partial<CourseFilters>> = (data: Record<string, string>) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  const onIconClick = (data) => {
    const dataConverted = convertDatatoExams(data, mappedExams, false);

    const dataIndex = dataToSend.findIndex((d) => d._id === data.row._id);
    if (dataIndex === -1) {
      setDataToSend([...dataToSend, dataConverted]);
    } else {
      setDataToSend(dataToSend.map((d, index) => (index === dataIndex ? dataConverted : d)));
    }
  };

  return (
    <Box>
      {errorData.error && errorData.status != 404 ? (
        <div data-testid="list-module-reports-title-container-div-error">
          <Text variant="h2">Hubo un error al cargar la tabla de reportes.</Text>
        </div>
      ) : (
        <CustomTable<StudentReport>
          key="assistance"
          headCells={dynamicHeadCells}
          addButton={{
            text: dataToSend.length <= 1 ? 'Subir asistencia' : 'Subir asistencias',
            onClick: onUpdateAssistance,
            disabled: !selectedObjects.length || !dataToSend.length,
            startIcon: <ArrowUpwardIcon />,
          }}
          rows={convertedReports}
          isLoading={isLoading}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          exportButton={true}
          pagination={pagination}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          filter="student"
          onFiltersSubmit={onFiltersSubmit}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
          isBooleanRow={true}
          onIconClick={onIconClick}
        />
      )}
    </Box>
  );
};

export default ModuleAssistance;
