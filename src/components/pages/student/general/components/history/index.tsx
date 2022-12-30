import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import CustomTable from 'src/components/shared/ui/table';
import { historyHeadCells } from 'src/constants/head-cells';
import { cannotShowList } from 'src/constants/modal-content';
import { StudentGroupHistory } from 'src/interfaces/entities/group';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getStudentGroupHistory } from 'src/redux/modules/auth/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

const History = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { isLoading, studentGroupHistory, errorData } = useAppSelector((state) => state.auth);
  const mappedHistory = useMemo(
    () =>
      studentGroupHistory.map((history) => ({
        ...history,
        _id: `${history._id}-${history.module._id}`,
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

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'historial' })));
    }
  }, [dispatch, errorData]);

  return (
    <CustomTable<StudentGroupHistory>
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
