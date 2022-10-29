import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import { CustomTableRowProps } from '../../types';
import styles from './index.module.css';

const CustomTableRow = <DataType extends GeneralDataType>({
  headCells,
  row,
  isItemSelected,
  handleCheckboxClick,
  deleteIcon,
  editIcon,
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
      {headCells.map((headCell, index) => {
        const headId = headCell.id.toString();
        const headDots = headId.includes('.') ? headId.split('.') : [];
        let cellValue = headDots.length ? row : row[headCell.id];
        if (headDots.length) {
          for (let i = 0; i < headDots.length; i++) {
            if (typeof cellValue === 'string') {
              break;
            }
            if (typeof cellValue === 'object') {
              cellValue = cellValue[headDots[i]];
            }
          }
        }
        if (typeof cellValue === 'boolean') {
          cellValue = cellValue ? headCell.booleanText[0] : headCell.booleanText[1];
        }
        return (
          <TableCell key={index}>
            <Text>{`${cellValue}`}</Text>
          </TableCell>
        );
      })}
      {(deleteIcon || editIcon) && (
        <TableCell>
          <div className={styles.buttonsContainer}>
            {editIcon && (
              <IconButton
                onClick={() => handleEdit(row?.postulant.dni ? row.postulant.dni : row._id)}
              >
                <EditIcon />
              </IconButton>
            )}
            {deleteIcon && (
              <IconButton onClick={() => handleDelete(row._id)}>
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
