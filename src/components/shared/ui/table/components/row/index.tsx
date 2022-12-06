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
  checkboxes,
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
    {},
  );

  const { handleSubmit, control, getValues } = useForm<EditableTableData>({
    mode: 'onBlur',
    defaultValues: defaultValues,
  });

  const onInputBlur = () => {
    const rowInputs = getValues();
    const filledInputs =
      Object.entries(rowInputs).filter(
        (arr) =>
          arr[1] !== '' && ((Number(arr[1]) >= 0 && Number(arr[1]) < 11) || isNaN(Number(arr[1]))),
      ).length - 1;
    if (editableHeadCells.length === filledInputs) {
      setDisabled(false);
      handleObjectCheckboxClick(row, 'check');
      handleSubmit(onInputChange)();
    } else {
      setDisabled(true);
      if (filledInputs === 0) {
        handleObjectCheckboxClick(row, 'uncheck');
      }
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
            disabled={disabled}
            onClick={() => {
              handleObjectCheckboxClick(row);
            }}
          />
        </TableCell>
      )}
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

        let cellElement: JSX.Element;
        if (headCell.cellElements?.length) {
          const chip = headCell.cellElements.find((cellElement) => cellElement.id === row[headId]);
          disableDeleteIcon = chip.disableDeleteButton;
          cellElement = chip.element;
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
          <TableCell
            key={index}
            className={`${!checkboxes && index === 0 && styles.tablePaddingLeftCell}`}
          >
            {headCell.cellElements?.length ? (
              cellElement
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
              <Button
                data-testid={`admin-button-${index}`}
                onClick={() => handleCustomIcon(row._id)}
              >
                <Text variant="body2Underline" color="secondary">
                  {customIconText}
                </Text>
              </Button>
            )}
            {editIcon && (
              <IconButton
                data-testid={`edit-button-${index}`}
                onClick={() => handleEdit(row?.postulant?.dni ? row.postulant.dni : row._id)}
              >
                <EditIcon />
              </IconButton>
            )}
            {deleteIcon && (
              <IconButton
                data-testid={`delete-button-${index}`}
                onClick={() => handleDelete(row._id)}
                disabled={disableDeleteIcon}
              >
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
