import React from 'react';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Checkbox, IconButton, TableCell, TableRow } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';
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
  customIconText,
  handleEdit,
  handleDelete,
  handleCustomIcon,
  style,
  saveEditableText,
  onEditableClick,
}: CustomTableRowProps<DataType>): JSX.Element => {
<<<<<<< HEAD
  let disableDeleteIcon;
=======
  const { handleSubmit, control } = useForm({
    mode: 'onChange',
  });
  let isInProgress = false;
  let editable = false;
>>>>>>> 48b1be0 (RL-143: update table editable)
  return (
    <TableRow
      style={style}
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
        editable = headCell.editable ? true : false;
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
        return (
          <TableCell key={index}>
            {headCell.chips ? chipType : <Text>{`${cellValue}`}</Text>}
          </TableCell>
        );

        if (headId === 'status') {
          switch (row[headId]) {
            case 'Completado':
              chipType = <Chip label="Completado" color="success" />;
              break;
            case 'En curso':
              isInProgress = true;
              chipType = <Chip label="En curso" color="primary" />;
              break;
            default:
              chipType = <Chip label="Próximo" variant="outlined" />;
              break;
          }
          return <TableCell key={index}>{chipType}</TableCell>;
        }

        if (editable) {
          return (
            <TableCell key={index}>
              <InputText
                control={control}
                name={headCell.id}
                size="small"
                showError={false}
                fullWidth={false}
              />
            </TableCell>
          );
        }
        return <TableCell key={index}>{<Text>{cellValue}</Text>}</TableCell>;
      })}
      {editable && <Button onClick={handleSubmit(onEditableClick)}>{saveEditableText}</Button>}
      {(deleteIcon || editIcon || customIconText) && !editable && (
        <TableCell>
          <div className={styles.buttonsContainer}>
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
