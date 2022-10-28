import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  alpha,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Toolbar,
} from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import { CustomTableHead, CustomTableRow } from './components';
import TableFilters from './components/table-filters';
import styles from './table.module.css';
import { TableProps } from './types';

const CustomTable = <DataType extends GeneralDataType>({
  headCells,
  rows,
  pagination,
  deleteIcon,
  editIcon,
  exportButton,
  filter,
  onFiltersSubmit,
  handleDelete,
  handleEdit,
  handleExportTable,
  handleExportSelection,
  handleChangePage,
  handleChangeRowsPerPage,
  addButton,
}: TableProps<DataType>): JSX.Element => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [dense, setDense] = useState(false);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    pagination.page > 0 ? Math.max(0, pagination.page * 5 - pagination.totalDocs) : 0;

  return (
    <Box>
      <Toolbar
        sx={{
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        <div className={styles.tableToolbarContainer}>
          {filter ? <TableFilters filter={filter} onFiltersSubmit={onFiltersSubmit} /> : null}
          <div className={styles.tableToolbarButtonsContainer}>
            {addButton?.text.length ? (
              <div className={styles.addButton}>
                <Button
                  startIcon={<PersonAddIcon />}
                  size="small"
                  fullWidth={true}
                  variant="contained"
                  onClick={() => {
                    navigate(addButton.addPath);
                  }}
                >
                  {addButton.text}
                </Button>
              </div>
            ) : null}
            {exportButton && (
              <div className={styles.tableexportButtonContainer}>
                <Button
                  startIcon={<UploadFileIcon />}
                  size="small"
                  fullWidth={true}
                  variant="contained"
                  onClick={
                    selected.length
                      ? () => handleExportSelection(selected)
                      : () => handleExportTable()
                  }
                >
                  {selected.length ? 'Exportar seleccion' : 'Exportar tabla'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Toolbar>
      <TableContainer>
        <Table size={dense ? 'small' : 'medium'}>
          <CustomTableHead<DataType>
            headCells={headCells}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            deleteIcon={deleteIcon}
            editIcon={editIcon}
          />
          <TableBody>
            {rows?.length ? (
              rows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                return (
                  <CustomTableRow<DataType>
                    key={index}
                    headCells={headCells}
                    row={row}
                    isItemSelected={isItemSelected}
                    handleCheckboxClick={handleCheckboxClick}
                    deleteIcon={deleteIcon}
                    editIcon={editIcon}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                );
              })
            ) : (
              <TableRow
                style={{
                  height: dense ? 53 : 73,
                }}
              >
                <TableCell colSpan={12}>
                  <Text textAlign="center">No se encontraron usuarios activos.</Text>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 53 : 73) * emptyRows,
                }}
              >
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={pagination.totalDocs}
        rowsPerPage={pagination.limit}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

export default CustomTable;
