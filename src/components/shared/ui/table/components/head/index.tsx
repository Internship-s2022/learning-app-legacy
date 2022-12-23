import React from 'react';
import { Checkbox, styled, TableCell, tableCellClasses, TableHead, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';

import { CustomTableHeadProps } from '../../types';
import styles from './table-head.module.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.tableHead.main,
  },
}));

const CustomTableHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  checkboxes,
  headCells,
  deleteIcon,
  editIcon,
  isRowEditable,
  style,
  saveEditableText = '',
  customIconText = '',
}: CustomTableHeadProps) => {
  return (
    <TableHead data-testid="table-head">
      <TableRow style={style}>
        {checkboxes && (
          <StyledTableCell className={styles.tablePaddingLeftCheckbox}>
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
        )}
        {headCells.map((headCell, index) => (
          <StyledTableCell
            className={`${!checkboxes && index === 0 && styles.tablePaddingLeftCell}`}
            key={headCell.label}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <Text variant="headerTable">{headCell.label}</Text>
            {headCell.subLabel && (
              <Text variant="subtitle2" color="white">
                {headCell.subLabel}
              </Text>
            )}
          </StyledTableCell>
        ))}
        {(deleteIcon || editIcon || saveEditableText || customIconText || isRowEditable) && (
          <StyledTableCell />
        )}
      </TableRow>
    </TableHead>
  );
};
export default CustomTableHead;
