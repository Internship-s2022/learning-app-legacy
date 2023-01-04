import React from 'react';
import { useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import { BooleanTableRowProps, EditableTableData, HeadCell } from '../../types';
import styles from './index.module.css';

const BooleanTableRow = <DataType extends GeneralDataType>({
  headCells,
  row,
  isItemSelected,
  checkboxes,
  style,
  handleObjectCheckboxClick,
  index,
  onIconClick,
}: BooleanTableRowProps<DataType>): JSX.Element => {
  const booleanHeadCells = headCells.filter((headCell) => headCell.boolean === true);

  const defaultValues: EditableTableData = booleanHeadCells.reduce(
    (defaultValues, headCell) => ({
      ...defaultValues,
      row,
      [headCell.id]: row[headCell.id],
    }),
    {},
  );

  const { getValues, setValue, watch, handleSubmit } = useForm<EditableTableData>({
    defaultValues: defaultValues,
  });

  const onChange = (name) => {
    if (getValues(name) !== row[name]) {
      handleObjectCheckboxClick(row, 'check');
    } else {
      handleObjectCheckboxClick(row, 'uncheck');
    }
  };

  return (
    <TableRow
      style={style}
      data-testid={`row-${index}`}
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
    >
      {checkboxes && (
        <TableCell className={styles.tablePaddingLeftCheckbox}>
          <Checkbox
            color="primary"
            checked={isItemSelected}
            onClick={() => {
              handleObjectCheckboxClick(row);
            }}
          />
        </TableCell>
      )}
      {headCells.map((headCell: HeadCell, index) => {
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
        const rowValue = watch(headCell.id);

        return (
          <TableCell
            key={index}
            className={`${!checkboxes && index === 0 && styles.tablePaddingLeftCell}`}
          >
            {typeof cellValue === 'string' ? (
              <Text data-testid={`column-${index}`}>{cellValue}</Text>
            ) : (
              <IconButton
                data-testid={`cancel-button-${index}`}
                onClick={() => {
                  setValue(headCell.id, !rowValue);
                  onChange(headCell.id);
                  handleSubmit(onIconClick)();
                }}
              >
                {rowValue ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
              </IconButton>
            )}
          </TableCell>
        );
      })}
      <TableCell />
    </TableRow>
  );
};

export default BooleanTableRow;
