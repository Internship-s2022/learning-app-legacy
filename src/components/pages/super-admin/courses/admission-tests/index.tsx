import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';

import { InputText, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import AdmissionTestTableFilters from 'src/components/shared/ui/table/components/filters/admission-test';
import { admissionTestHeadCells } from 'src/constants/head-cells';
import { confirmDelete, invalidForm } from 'src/constants/modal-content';
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
import { admissionTestResolver } from './validations';

const AdmissionTestsList = () => {
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState('');
  const [selectedObjects, setSelectedObjects] = useState([]);
  const { admissionTests, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.admissionTest,
  );

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isValid },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: '',
    },
    mode: 'all',
    resolver: admissionTestResolver,
  });

  const name = watch('name');

  useEffect(() => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const onInputSubmit = async (data: { name: string }) => {
    const response = editId
      ? await dispatch(
          editAdmissionTests(editId, {
            ...data,
            isActive: true,
          }),
        )
      : await dispatch(
          createAdmissionTests({
            ...data,
            isActive: true,
          }),
        );
    if (response && 'error' in response.payload) {
      dispatch(
        openModal({
          ...invalidForm,
          description:
            response.payload.status === 400
              ? 'El nombre del test de admisión ya esta en uso.'
              : invalidForm.description,
        }),
      );
    } else {
      reset();
      setEditId('');
      setSelectedObjects([]);
    }
  };

  const handleCancelInput = () => {
    reset();
    setEditId('');
    setSelectedObjects([]);
  };

  const handleDelete = (id: string) => {
    reset();
    setEditId('');
    setSelectedObjects([]);
    dispatch(
      openModal(
        confirmDelete({
          entity: 'test de admisión',
          handleConfirm: () => {
            dispatch(deleteAdmissionTest(id));
          },
        }),
      ),
    );
  };

  const handleEdit = (_id) => {
    const admTestName = admissionTests.find((test) => test._id === _id).name;
    reset();
    setValue('name', admTestName);
    setEditId(_id);
    setSelectedObjects([{ _id: _id }]);
  };

  return (
    <Box className={styles.container} data-testid="list-admTest-container-div">
      <Box className={styles.toolbarContainer}>
        <Text variant="h1">Tests de admisión</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Lista completa con los test de admisión actuales de la aplicación.
        </Text>
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
                InputProps={{
                  endAdornment:
                    name.length > 0 ? (
                      <InputAdornment
                        data-testid="cancel-admission-test-button"
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
            <Box className={styles.buttonContainer}>
              <Button
                data-testid="add-admission-test-button"
                startIcon={editId.length ? <EditIcon /> : <PostAddIcon />}
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!isValid}
              >
                {editId.length ? 'Editar test' : 'Agregar test'}
              </Button>
            </Box>
          </form>
        </div>
      </Box>
      {errorData.error && errorData.status === 500 ? (
        <Text data-testid="list-admTest-title-container-div-error" variant="subtitle1">
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
          disableToolbar={true}
        />
      )}
    </Box>
  );
};

export default AdmissionTestsList;
