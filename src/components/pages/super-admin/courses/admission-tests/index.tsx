import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { Button, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';

import { InputText, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import AdmissionTestTableFilters from 'src/components/shared/ui/table/components/filters/admission-test';
import { admissionTestHeadCells } from 'src/constants/head-cells';
import { AdmissionTest } from 'src/interfaces/entities/admission-test';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/admission-test/actions';
import {
  createAdmissionTests,
  deleteAdmissionTest,
  editAdmissionTests,
  getAdmissionTests,
} from 'src/redux/modules/admission-test/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './admission-test.module.css';

const AdmissionTestsList = () => {
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState('');
  const [selectedObjects, setSelectedObjects] = useState([]);
  const { admissionTests, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.admissionTest,
  );

  const { handleSubmit, control, setValue, watch } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
    mode: 'onSubmit',
  });

  const name = watch('name');

  useEffect(() => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const onFilterSubmit = async (data) => {
    dispatch(setQuery(`&${new URLSearchParams(data).toString().replace(/_/g, '.')}`));
  };

  const onInputSubmit = async (data) => {
    if (editId) {
      const response = await dispatch(
        editAdmissionTests(editId, {
          ...data,
          isActive: true,
        }),
      );
      if (response.error) {
        dispatch(
          openModal({
            title: 'Algo salió mal',
            description:
              response.status === 400
                ? 'El nombre del test de admisión ya esta en uso.'
                : 'Por favor revise los datos ingresados.',
            type: 'alert',
          }),
        );
      } else {
        setValue('name', '');
        setEditId('');
        setSelectedObjects([]);
      }
    } else {
      const response = await dispatch(
        createAdmissionTests({
          ...data,
          isActive: true,
        }),
      );
      if (response.error) {
        dispatch(
          openModal({
            title: 'Algo salió mal',
            description:
              response.status === 400
                ? 'El nombre del test de admisión ya esta en uso.'
                : 'Por favor revise los datos ingresados.',
            type: 'alert',
          }),
        );
      } else {
        setValue('name', '');
        setEditId('');
        setSelectedObjects([]);
      }
    }
  };

  const handleCancelInput = () => {
    setValue('name', '');
    setEditId('');
    setSelectedObjects([]);
  };

  const handleDelete = (id: string) => {
    setValue('name', '');
    setEditId('');
    setSelectedObjects([]);
    dispatch(
      openModal({
        title: 'Eliminar test de admisión',
        description: '¿Está seguro que desea eliminar este test de admisión?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(deleteAdmissionTest(id));
        },
      }),
    );
  };

  const handleEdit = (_id) => {
    const admTestName = admissionTests.find((test) => test._id === _id).name;
    setValue('name', admTestName);
    setEditId(_id);
    setSelectedObjects([{ _id: _id }]);
  };

  return (
    <Box className={styles.container} data-testid="list-admTest-container-div">
      <Text variant="h1">Tests de admisión</Text>
      <div className={styles.toolbar}>
        <div className={styles.filtersContainer}>
          <AdmissionTestTableFilters onFiltersSubmit={onFilterSubmit} />
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onInputSubmit)}>
          <Box className={styles.inputContainer}>
            <InputText
              control={control}
              name="name"
              label="Ingrese nombre del test"
              variant="outlined"
              fullWidth={true}
              size="small"
              showError={false}
              InputProps={{
                endAdornment:
                  name.length > 0 ? (
                    <InputAdornment
                      position="end"
                      onClick={handleCancelInput}
                      sx={{ cursor: 'pointer' }}
                    >
                      <CancelIcon />
                    </InputAdornment>
                  ) : null,
              }}
            />
          </Box>
          <Button
            startIcon={editId.length ? <EditIcon /> : <AddIcon />}
            variant="contained"
            color="secondary"
            type="submit"
            disabled={name.length < 3}
          >
            {editId.length ? 'Editar test' : 'Agregar test'}
          </Button>
        </form>
      </div>
      {errorData.error && errorData.status === 500 ? (
        <Text data-testid="list-admTest-title-container-div-error" variant="h2">
          Hubo un error al cargar la tabla de tests de admisión.
        </Text>
      ) : (
        <CustomTable<AdmissionTest>
          headCells={admissionTestHeadCells}
          rows={admissionTests}
          checkboxes={false}
          isLoading={isLoading}
          pagination={pagination}
          exportButton={false}
          deleteIcon={true}
          editIcon={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
        />
      )}
    </Box>
  );
};

export default AdmissionTestsList;
