import React from 'react';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Box,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
} from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { GeneralDataType } from 'src/interfaces';

import {
  CustomTableFilters,
  CustomTableHead,
  CustomTablePagination,
  CustomTableRow,
} from './components';
import styles from './table.module.css';
import { TableProps } from './types';

const CustomTable = <DataType extends GeneralDataType>({
  headCells,
  rows,
  isLoading,
  checkboxes = true,
  pagination,
  deleteIcon,
  editIcon,
  customIconText,
  exportButton,
  filter,
  onFiltersSubmit,
  handleDelete,
  handleEdit,
  handleCustomIcon,
  handleExportTable,
  handleExportSelection,
  handleChangePage,
  handleChangeRowsPerPage,
  addButton,
  saveEditableText,
  onEditableSubmit,
  onInputChange,
  selectedObjects = [],
  setSelectedObjects,
  disableToolbar = false,
  onRowEditableSubmit,
  isRowEditable = false,
}: TableProps<DataType>): JSX.Element => {
  const rowHeight = 60;
  const navigate = useNavigate();

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedObjects(rows);
      return;
    }
    setSelectedObjects([]);
  };

  const handleObjectCheckboxClick = (
    object: DataType,
    setValue: 'check' | 'uncheck' | undefined = undefined,
  ) => {
    const selectedIndex = selectedObjects.findIndex((obj) => obj._id === object._id);
    let newSelected = [...selectedObjects];

    if (selectedIndex === -1 && setValue !== 'uncheck') {
      newSelected.push(object);
    } else if (setValue !== 'check') {
      if (selectedIndex === 0) {
        newSelected = newSelected.slice(1, newSelected.length);
      } else if (selectedIndex === selectedObjects.length - 1) {
        newSelected = newSelected.slice(0, -1);
      } else if (selectedIndex > 0) {
        newSelected = [
          ...selectedObjects.slice(0, selectedIndex),
          ...selectedObjects.slice(selectedIndex + 1),
        ];
      }
    }
    setSelectedObjects([...newSelected]);
  };
  const isSelected = (id: string) => selectedObjects.findIndex((obj) => obj._id === id) !== -1;

  const emptyRows =
    pagination.page > 0 ? Math.max(0, pagination.page * 5 - pagination.totalDocs) : 0;

  return (
    <Box data-testid="shared-component-table">
      {!disableToolbar && (
        <Toolbar>
          <div className={styles.tableToolbarContainer}>
            {filter ? (
              <CustomTableFilters filter={filter} onFiltersSubmit={onFiltersSubmit} />
            ) : (
              <div></div>
            )}
            <div
              data-testid="shared-component-table-buttons"
              className={styles.tableToolbarButtonsContainer}
            >
              {addButton?.text.length ? (
                <div data-testid="shared-component-table-addBtn" className={styles.addButton}>
                  <Button
                    startIcon={addButton?.startIcon ? addButton.startIcon : <PersonAddIcon />}
                    color="secondary"
                    size="small"
                    fullWidth={true}
                    variant="contained"
                    disabled={addButton?.disabled}
                    onClick={
                      addButton.addPath
                        ? () => {
                            navigate(addButton.addPath);
                          }
                        : () => addButton.onClick()
                    }
                  >
                    {addButton.text}
                  </Button>
                </div>
              ) : null}
              {exportButton && (
                <div
                  data-testid="shared-component-table-expBtn"
                  className={styles.tableexportButtonContainer}
                >
                  <Button
                    startIcon={<UploadFileIcon />}
                    size="small"
                    fullWidth={true}
                    variant="contained"
                    onClick={
                      selectedObjects.length
                        ? () => handleExportSelection(selectedObjects.map((obj) => obj._id))
                        : () => handleExportTable()
                    }
                  >
                    {selectedObjects.length ? 'Exportar seleccion' : 'Exportar tabla'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      )}
      <TableContainer>
        <Table size="small">
          <CustomTableHead
            headCells={headCells}
            checkboxes={checkboxes}
            numSelected={selectedObjects.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={rows.length}
            deleteIcon={deleteIcon}
            editIcon={editIcon}
            style={{ height: rowHeight }}
            saveEditableText={saveEditableText}
            customIconText={customIconText}
            isRowEditable={isRowEditable}
          />
          <TableBody data-testid="table-container-div">
            {isLoading ? (
              <TableRow sx={{ width: '100%' }} data-testid="component-linear-loader">
                <TableCell colSpan={12}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ) : null}
            {rows?.length ? (
              rows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                return (
                  <CustomTableRow<DataType>
                    key={index}
                    index={index}
                    headCells={headCells}
                    checkboxes={checkboxes}
                    row={row}
                    isItemSelected={isItemSelected}
                    deleteIcon={deleteIcon}
                    editIcon={editIcon}
                    customIconText={customIconText}
                    handleCustomIcon={handleCustomIcon}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    style={{ height: rowHeight }}
                    saveEditableText={saveEditableText}
                    onEditableSubmit={onEditableSubmit}
                    onRowEditableSubmit={onRowEditableSubmit}
                    onInputChange={onInputChange}
                    handleObjectCheckboxClick={handleObjectCheckboxClick}
                    isRowEditable={isRowEditable}
                  />
                );
              })
            ) : !isLoading ? (
              <TableRow data-testid="empty-table-div" style={{ height: rowHeight }}>
                <TableCell colSpan={12}>
                  <Text textAlign="center">No se encontraron documentos.</Text>
                </TableCell>
              </TableRow>
            ) : null}
            {emptyRows > 0 && !isLoading && (
              <TableRow style={{ height: rowHeight * emptyRows }}>
                <TableCell colSpan={12} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isLoading && rows.length > 18 ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box sx={{ width: '100%', height: '4px' }}></Box>
      )}
      <CustomTablePagination
        rowsPerPageOptions={[25, 50, 100]}
        count={pagination.totalDocs}
        rowsPerPage={pagination.limit}
        page={pagination.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        data-testid="pagination-container"
        backIconButtonProps={{
          'data-testid': 'pagination-back-icon-button',
        }}
        nextIconButtonProps={{
          'data-testid': 'pagination-next-icon-button',
        }}
        SelectProps={{
          'data-testid': 'pagination-selector',
        }}
      />
    </Box>
  );
};

export default CustomTable;
