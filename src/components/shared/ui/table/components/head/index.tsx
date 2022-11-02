import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import { CustomTableHeadProps } from '../../types';

const CustomTableHead = <DataType extends GeneralDataType>({
  onSelectAllClick,
  numSelected,
  rowCount,
  headCells,
  deleteIcon,
  editIcon,
  style,
  saveEditableText = '',
}: CustomTableHeadProps<DataType>) => {
  return (
    <TableHead>
      <TableRow style={style}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.label}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <Text>{headCell.label}</Text>
          </TableCell>
        ))}
        {(deleteIcon || editIcon || saveEditableText) && <TableCell />}
      </TableRow>
    </TableHead>
  );
};
export default CustomTableHead;
