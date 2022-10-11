import React, { useState } from 'react';
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

import { GeneralDataType } from 'src/interfaces';

import Text from '../text';
import styles from './table.module.css';
import CustomTableFilters from './table-filters';
import CustomTableHead from './table-head';
import CustomTableRow from './table-row';
import { TableProps } from './types';

const CustomTable = <DataType extends GeneralDataType>({
  headCells,
  rows,
  icons,
  exportButtons,
  title,
  filters = [],
  onFiltersSubmit,
  handleDelete,
  handleEdit,
  handleExportTable,
  handleExportSelection,
}: TableProps<DataType>): JSX.Element => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      {filters.length > 0 && (
        <CustomTableFilters onFiltersSubmit={onFiltersSubmit} filters={filters} />
      )}
      <Toolbar
        sx={{
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        <div className={styles.tableToolbarContainer}>
          {selected.length > 0 ? (
            <Text>{`${selected.length} selected`}</Text>
          ) : (
            <Text>{title}</Text>
          )}
          {exportButtons && (
            <div className={styles.tableHeadButtonsContainer}>
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                onClick={() => handleExportTable(rows.map((row) => row._id))}
              >
                Export table
              </Button>
              <Button variant="contained" onClick={() => handleExportSelection(selected)}>
                Export selection
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
      <TableContainer>
        <Table size={dense ? 'small' : 'medium'}>
          <CustomTableHead<DataType>
            headCells={headCells}
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            icons={icons}
          />
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              const isItemSelected = isSelected(row._id);
              return (
                <CustomTableRow<DataType>
                  key={index}
                  headCells={headCells}
                  row={row}
                  isItemSelected={isItemSelected}
                  handleCheckboxClick={handleCheckboxClick}
                  icons={icons}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
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
