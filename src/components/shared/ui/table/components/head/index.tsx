import React from 'react';
import { Checkbox, styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import { CustomTableHeadProps } from '../../types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.default,
  },
}));

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
        <StyledTableCell padding="checkbox">
          <Checkbox
            sx={{
              color: '#FFFFFF',
              '&.Mui-checked': {
                color: '#FFFFFF',
              },
              '&.MuiCheckbox-indeterminate': {
                color: '#FFFFFF',
              },
            }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.label}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <Text variant="headerTable">{headCell.label}</Text>
          </StyledTableCell>
        ))}
        {(deleteIcon || editIcon || saveEditableText || customIconText) && <StyledTableCell />}
      </TableRow>
    </TableHead>
  );
};
export default CustomTableHead;
