import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from '@mui/material';

import { ApiData } from 'src/interfaces';
import { capitalizeFirstLetter } from 'src/utils/formatters';

import Dropdown from '../inputs/dropdown';
import InputText from '../inputs/text';
import Text from '../text/text';
import styles from './table.module.css';
import {
  CustomTableFiltersProps,
  CustomTableHeadProps,
  TableFiltersForm,
  TableProps,
} from './types';

const CustomTableHead = <DataType extends ApiData>({
  onSelectAllClick,
  numSelected,
  rowCount,
  headCells,
  icons,
}: CustomTableHeadProps<DataType>) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.label}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <Text>{headCell.label}</Text>
          </TableCell>
        ))}
        {icons && (
          <TableCell>
            <Text>Actions</Text>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

const CustomTableFilters = ({ filters }: CustomTableFiltersProps) => {
  const { handleSubmit, control, reset } = useForm<TableFiltersForm>({
    defaultValues: {
      id: '',
      name: '',
      status: '',
    },
    mode: 'onSubmit',
  });
  const onSubmit = (data: Record<string, string>) =>
    alert(`?${new URLSearchParams(data).toString()}`);

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit(onSubmit)}>
      {filters.map((filter, index) =>
        filter == 'status' ? (
          <Box sx={{ mr: 1, width: '25ch' }} key={index}>
            <Dropdown
              options={[
                { value: '', label: 'Ninguno' },
                { value: 'admin', label: 'Administrador' },
                { value: 'tutor', label: 'Tutor' },
                { value: 'student', label: 'Estudiante' },
                { value: 'postulant', label: 'Postulante' },
              ]}
              control={control}
              name={filter}
              label={capitalizeFirstLetter(filter)}
              variant="outlined"
              showError={false}
              size="small"
              placeholder="Status"
            />
          </Box>
        ) : (
          <InputText
            sx={{ mr: 1 }}
            key={index}
            control={control}
            name={filter}
            label={capitalizeFirstLetter(filter)}
            variant="outlined"
            fullWidth={false}
            size="small"
            showError={false}
          />
        ),
      )}
      <Button sx={{ mr: 1 }} type="submit" variant="contained">
        Filter
      </Button>
      <Button sx={{ mr: 1 }} onClick={() => reset()} variant="outlined">
        Reset
      </Button>
    </form>
  );
};

const CustomTable = <DataType extends ApiData>({
  headCells,
  rows,
  icons,
  exportButtons,
  title,
  filters = [],
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

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
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
      {filters.length > 0 && <CustomTableFilters filters={filters} />}
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
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >
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
              const labelId = `Custom-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox" onClick={(event) => handleClick(event, row._id)}>
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  {headCells.map((headCell, index) => {
                    return (
                      <TableCell key={index}>
                        <Text>{`${row[headCell.id]}`}</Text>
                      </TableCell>
                    );
                  })}
                  {icons && (
                    <TableCell>
                      <IconButton onClick={() => handleEdit(row._id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
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
