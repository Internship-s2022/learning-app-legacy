import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import { CustomTableRowProps } from '../types';

const CustomTableRow = <DataType extends GeneralDataType>({
  headCells,
  row,
  isItemSelected,
  handleCheckboxClick,
  icons,
  handleEdit,
  handleDelete,
}: CustomTableRowProps<DataType>): JSX.Element => {
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox" onClick={(event) => handleCheckboxClick(event, row._id)}>
        <Checkbox color="primary" checked={isItemSelected} />
      </TableCell>
      {headCells.map((headCell, index) => (
        <TableCell key={index}>
          <Text>{`${row[headCell.id]}`}</Text>
        </TableCell>
      ))}
      {icons && (
        <TableCell>
          <IconButton onClick={() => handleEdit(row._id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row._id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
