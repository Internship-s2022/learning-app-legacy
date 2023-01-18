import React from 'react';
import { TablePagination } from '@mui/material';

import { CustomTablePaginationProps } from './types';

const CustomTablePagination = (props: CustomTablePaginationProps) => {
  return (
    <TablePagination
      {...props}
      component="div"
      showFirstButton={true}
      showLastButton={true}
      labelRowsPerPage="Filas por página:"
      labelDisplayedRows={({ from, to, count }) =>
        `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
      }
    />
  );
};

export default CustomTablePagination;
