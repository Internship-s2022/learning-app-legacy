import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import { CustomTableHeadProps } from '../../types';

const CustomTableHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  headCells,
  deleteIcon,
  editIcon,
  style,
  saveEditableText = '',
  customIconText = '',
}: CustomTableHeadProps) => {
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
        {(deleteIcon || editIcon || saveEditableText || customIconText) && <TableCell />}
      </TableRow>
    </TableHead>
  );
};
export default CustomTableHead;
