import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Checkbox, IconButton, TableCell, TableRow } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import { CustomTableRowProps, EditableTableData, HeadCell } from '../../types';
import styles from './index.module.css';

const CustomTableRow = <DataType extends GeneralDataType>({
  headCells,
  row,
  isItemSelected,
  deleteIcon,
  editIcon,
  customIconText,
  handleEdit,
  handleDelete,
  handleCustomIcon,
  style,
  saveEditableText,
  onEditableSubmit,
  onInputChange,
  handleObjectCheckboxClick,
  index,
}: CustomTableRowProps<DataType>): JSX.Element => {
  let disableDeleteIcon = false;
  let editable = false;
  const editableHeadCells = headCells.filter((headCell) => headCell.editable === true);
  const [disabled, setDisabled] = useState(editableHeadCells.length > 0);

  const defaultValues: EditableTableData = editableHeadCells.reduce(
    (defaultValues, headCell) => ({ ...defaultValues, row, [headCell.id]: '' }),
    { row: { _id: '' } },
  );

  const { handleSubmit, control, getValues } = useForm<EditableTableData>({
    mode: 'onBlur',
    defaultValues: defaultValues,
  });

  const onInputBlur = () => {
    const rowInputs = getValues();
    const filledInputs = Object.entries(rowInputs).filter((arr) => arr[1] !== '').length - 1;
    if (filledInputs > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (editableHeadCells.length === filledInputs) {
      handleObjectCheckboxClick(row, 'check');
    } else if (filledInputs === 0) {
      handleObjectCheckboxClick(row, 'uncheck');
    }
    handleSubmit(onInputChange)();
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
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          disabled={disabled}
          onClick={() => {
            handleObjectCheckboxClick(row);
          }}
        />
      </TableCell>
      {headCells.map((headCell: HeadCell, index) => {
        editable = headCell.editable;
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

        let chipType: JSX.Element;
        if (headCell.chips) {
          const chip = headCell.chipsTypes.find((chipType) => chipType.id === row[headId]);
          disableDeleteIcon = chip.disableDeleteButton;
          chipType = chip.element;
        }

        if (editable) {
          return (
            <TableCell key={index}>
              <Box className={styles.inputContainer}>
                <InputText
                  onBlur={onInputBlur}
                  type="number"
                  control={control}
                  name={headCell.id}
                  size="small"
                  showError={false}
                  fullWidth={false}
                />
              </Box>
            </TableCell>
          );
        }
        return (
          <TableCell key={index}>
            {headCell.chips ? (
              chipType
            ) : (
              <Text data-testid={`column-${index}`}>{`${cellValue}`}</Text>
            )}
          </TableCell>
        );
      })}
      {(deleteIcon || editIcon || customIconText || editable) && (
        <TableCell>
          <div className={styles.buttonsContainer}>
            {editable && (
              <Button onClick={handleSubmit(onEditableSubmit)} disabled={disabled}>
                <Text
                  variant={disabled ? 'disableText' : 'body2Underline'}
                  color={!disabled && 'secondary'}
                >
                  {saveEditableText}
                </Text>
              </Button>
            )}
            {customIconText && (
              <Button onClick={() => handleCustomIcon(row._id)}>
                <Text variant="body2Underline" color="secondary">
                  {customIconText}
                </Text>
              </Button>
            )}
            {editIcon && (
              <IconButton
                onClick={() => handleEdit(row?.postulant?.dni ? row.postulant.dni : row._id)}
              >
                <EditIcon />
              </IconButton>
            )}
            {deleteIcon && (
              <IconButton onClick={() => handleDelete(row._id)} disabled={disableDeleteIcon}>
                <DeleteIcon color={disableDeleteIcon ? 'info' : 'error'} />
              </IconButton>
            )}
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};

export default CustomTableRow;
