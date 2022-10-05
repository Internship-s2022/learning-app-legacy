import React from 'react';
import { FieldValues } from 'react-hook-form';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { TableProps } from './types';

const Table = <TTableRowType extends FieldValues>({
  columns,
  rows,
}: TableProps<TTableRowType>): JSX.Element => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Table;
