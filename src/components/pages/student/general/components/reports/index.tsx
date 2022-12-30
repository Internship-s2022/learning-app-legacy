import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import CustomTable from 'src/components/shared/ui/table';
import { cannotShowList } from 'src/constants/modal-content';
import { StudentReport } from 'src/interfaces/entities/report';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getStudentReports } from 'src/redux/modules/auth/thunks';
import { openModal } from 'src/redux/modules/ui/actions';
import { getReportsFormattedAndHeadCells } from 'src/utils/generate-dynamic-head-cell';

const Reports = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { isLoading, studentReports, errorData } = useAppSelector((state) => state.auth);
  const { mappedReports, studentHeadCells } = useMemo(
    () => getReportsFormattedAndHeadCells(studentReports),
    [studentReports],
  );

  useEffect(() => {
    dispatch(getStudentReports(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'reportes' })));
    }
  }, [dispatch, errorData]);

  return (
    <CustomTable<StudentReport>
      headCells={studentHeadCells}
      rows={mappedReports}
      isLoading={isLoading}
      pagination={{
        totalDocs: mappedReports.length,
        limit: 25,
        totalPages: 0,
        page: 1,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      }}
      deleteIcon={false}
      checkboxes={false}
      editIcon={false}
      exportButton={false}
      handleChangePage={() => ({})}
      handleChangeRowsPerPage={() => ({})}
    />
  );
};

export default Reports;
