import React from 'react';

import CustomTable from 'src/components/shared/ui/table';
import { ReportStudent } from 'src/interfaces/entities/report';
import { getReportsFormattedAndHeadCells } from 'src/utils/generate-dynamic-head-cell';

import reports from './mock';

const Reports = (): JSX.Element => {
  const { mappedReports, studentHeadCells } = getReportsFormattedAndHeadCells(reports);

  return (
    <CustomTable<ReportStudent>
      headCells={studentHeadCells}
      rows={mappedReports}
      pagination={{
        totalDocs: reports.length,
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
