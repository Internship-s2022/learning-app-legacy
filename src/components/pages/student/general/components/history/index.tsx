import React, { useMemo } from 'react';

import CustomTable from 'src/components/shared/ui/table';
import { historyHeadCells } from 'src/constants/head-cells';

import history from './mock';

const History = (): JSX.Element => {
  const mappedHistory = useMemo(
    () =>
      history.map((history) => ({
        ...history,
        tutor: {
          ...history.tutor,
          fullName: `${history.tutor.postulant.firstName} ${history.tutor.postulant.lastName}`,
        },
      })),
    [history],
  );

  return (
    <CustomTable
      headCells={historyHeadCells}
      rows={mappedHistory}
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
