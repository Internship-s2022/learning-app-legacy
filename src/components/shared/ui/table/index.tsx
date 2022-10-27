import { ThunkDispatch } from 'redux-thunk';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { GeneralDataType } from 'src/interfaces';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { setTableLimit, setTablePage } from 'src/redux/modules/ui/actions';

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
  addButton,
}: TableProps<DataType>): JSX.Element => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const history = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const { pageNumber, limitNumber } = useSelector((state: RootReducer) => state.ui.tablePagination);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setTablePage({ pageNumber: newPage + 1, pagination: pagination }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setTableLimit({ limitNumber: parseInt(event.target.value, 10), pagination: pagination }),
    );
    dispatch(setTablePage({ pageNumber: 1, pagination: pagination }));
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    pageNumber > 0 ? Math.max(0, pageNumber * limitNumber - pagination.totalDocs + 1) : 0;
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
                    history(addButton.addPath);
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
                      : () => handleExportTable('user')
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
            {rows.map((row, index) => {
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
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
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
        rowsPerPage={limitNumber}
        page={pageNumber - 1}
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
