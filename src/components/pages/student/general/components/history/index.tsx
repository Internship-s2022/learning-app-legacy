import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import CustomTable from 'src/components/shared/ui/table';
import { historyHeadCells } from 'src/constants/head-cells';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getStudentGroupHistory } from 'src/redux/modules/auth/thunks';

const History = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { isLoading, studentGroupHistory } = useAppSelector((state) => state.auth);
  const mappedHistory = useMemo(
    () =>
      studentGroupHistory.map((history) => ({
        ...history,
        tutor: {
          ...history.tutor,
          fullName: `${history.tutor.postulant.firstName} ${history.tutor.postulant.lastName}`,
        },
      })),
    [studentGroupHistory],
  );

  useEffect(() => {
    dispatch(getStudentGroupHistory(courseId));
  }, [courseId, dispatch]);

  return (
    <CustomTable
      headCells={historyHeadCells}
      rows={mappedHistory}
      isLoading={isLoading}
      pagination={{
        totalDocs: history.length,
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

export default History;
