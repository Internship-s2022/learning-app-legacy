import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { reportsModuleHeadCells } from 'src/constants/head-cells';
import { AdminRoutes } from 'src/constants/routes';
import { ModuleType } from 'src/interfaces/entities/module';
import { Report } from 'src/interfaces/entities/report';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { disableModule, getModuleById, getModules } from 'src/redux/modules/module/thunks';
import { getReportsByModuleId } from 'src/redux/modules/report/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertReports } from 'src/utils/formatters';
import { generateDynamicHeadCell } from 'src/utils/generate-dynamic-head-cell';

import styles from './module.module.css';

const ModuleReport = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId, moduleId } = useParams();
  const { modules } = useAppSelector((state: RootReducer) => state.module);
  const { reportsByModule, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.report,
  );
  useEffect(() => {
    dispatch(getReportsByModuleId(courseId, moduleId));
  }, [courseId]);

  const handleDisable = (_id: string) => {
    const module = modules.find((module) => module._id === _id);
    dispatch(
      openModal({
        title: 'Deshabilitar módulo del curso.',
        description: '¿Está seguro que desea deshabilitar a este módulo?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(disableModule(courseId, module._id));
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      getModules(courseId, `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, []);

  const convertedPostulantCourse = useMemo(
    () => convertReports(reportsByModule),
    [reportsByModule],
  );

  const dynamicHeadCells = [
    ...reportsModuleHeadCells,
    ...(generateDynamicHeadCell(['Problemática'], false) as HeadCell[]),
  ];

  const handleCustomIcon = (_id: string) => {
    const report = convertedPostulantCourse.find((e) => e._id === _id);
  };
  return (
    <section className={styles.container}>
      {reportsByModule && (
        <CustomTable<Report>
          checkboxes={false}
          headCells={dynamicHeadCells}
          isRowEditable={true}
          // addButton={{
          //   text: 'Agregar notas',
          //   onClick: onPromotePostulants,
          //   disabled: !selectedObjects.length,
          // }}
          rows={convertedPostulantCourse}
          handleDelete={handleDisable}
          // onRowEditableSubmit={handleCorrectTest}
          isLoading={isLoading}
          // handleExportSelection={handleExportSelection}
          // handleExportTable={handleExportTable}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          customIconText="Subir asistencia"
          handleCustomIcon={handleCustomIcon}
          pagination={{ ...pagination, totalDocs: reportsByModule?.length }}
          handleChangePage={() => undefined}
          handleChangeRowsPerPage={() => undefined}
          // selectedObjects={selectedObjects}
          // setSelectedObjects={setSelectedObjects}
        />
      )}
    </section>
  );
};

export default ModuleReport;
