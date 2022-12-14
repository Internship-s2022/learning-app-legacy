import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Autocomplete, Box, Chip, TextField } from '@mui/material';

import { Text, TransferList } from 'src/components/shared/ui';
import AutocompleteInput from 'src/components/shared/ui/inputs/autocomplete';
import CustomTable from 'src/components/shared/ui/table';
import { moduleFormHeadCells } from 'src/constants/head-cells';
import { SuperAdminRoutes } from 'src/constants/routes';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { disableModule, getModules } from 'src/redux/modules/module/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './add-module.module.css';

const AddModule = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const { modules, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.module,
  );

  // "course": "6397920f866601025a4b2623",
  // "name": "Developer",
  // "description": "officiis consequatur veniam",
  // "status": "PENDING",
  // "type": "DEV",
  // "groups": [],
  // "contents": [
  //     "Node JS",
  //     "React"
  // ],
  // "isActive": true,
  // "_id": "63979284866601025a4b2651",
  // "createdAt": "2022-12-12T20:43:48.007Z",
  // "updatedAt": "2022-12-12T20:43:48.007Z",
  // "__v": 0
  useEffect(() => {
    dispatch(
      getModules(courseId, `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`),
    );
  }, []);

  const { handleSubmit, control, setError, clearErrors } = useForm<ModuleType>({
    defaultValues: {
      course: undefined,
      name: '',
      description: '',
      status: undefined,
      type: undefined,
      groups: [],
      contents: [],
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
    mode: 'onSubmit',
  });

  return (
    <section className={styles.container}>
      <Box>
        <Text variant="subtitle1">Administrador</Text>
        <Text variant="h1">Agregar Módulo</Text>
        {/* <form onSubmit={handleSubmit}> */}
        <AutocompleteInput control={control} name="contents" options={[]} />
        {/* </form> */}
      </Box>
      <Box className={styles.transferListContainer}>
        {/* <TransferList isLoading={isLoading} options={modules} /> */}
      </Box>
    </section>
  );
};

export default AddModule;
