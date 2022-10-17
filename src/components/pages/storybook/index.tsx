import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Container } from '@mui/material';

import { Checkboxes, Dropdown, InputText, Preloader, Table, Text } from 'src/components/shared/ui/';
import { HeadCell } from 'src/components/shared/ui/table/types';
import apiClient from 'src/config/api';
import { GeneralDataType } from 'src/interfaces';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './storybook.module.css';
import { ExampleFormValues } from './types';

const resolver = joiResolver(
  Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(5).required(),
    country: Joi.string().required(),
    technologies: Joi.array().min(2).messages({
      'array.min': 'Select at least 2 options',
    }),
  }),
);

const dropdownOptions = [
  { value: 'ARG', label: 'Argentina' },
  { value: 'PAR', label: 'Paraguay' },
  { value: 'BOL', label: 'Bolivia' },
  { value: 'URG', label: 'Uruguay' },
];

const checkboxOptions = [
  { label: 'HTML', value: 'HTML' },
  { label: 'Javascript', value: 'Javascript' },
  { label: 'SQL', value: 'SQL' },
  { label: 'Typescript', value: 'Typescript' },
];

interface SuperAdmin extends GeneralDataType {
  firstName: string;
  lastName: string;
  email: string;
  firebaseUid: string;
  isActive: boolean;
}

const headCells: HeadCell<SuperAdmin>[] = [
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last name',
  },
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'First name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'firebaseUid',
    numeric: false,
    disablePadding: false,
    label: 'Firebase Uid',
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
];

const Storybook = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  useEffect(() => {
    async function fetchSuperAdmins() {
      const response = await apiClient.get('/super-admin');
      setSuperAdmins(response?.data.data);
    }
    fetchSuperAdmins();
  }, []);

  const handleEdit = (_id: string) => {
    alert(`Edit: ${_id}`);
  };

  const handleDelete = (_id: string) => {
    alert(`Delete: ${_id}`);
  };

  const handleExportSelection = (_ids: string[]) => {
    alert(`Selection (${_ids.length} items): ${_ids}`);
  };

  const handleExportTable = (_ids: string[]) => {
    alert(`All selection (${_ids.length} items): ${_ids}`);
  };

  const { handleSubmit, control, reset } = useForm<ExampleFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      technologies: [],
    },
    mode: 'onSubmit',
    resolver,
  });

  const onSubmit = (data) => {
    dispatch(
      openModal({
        title: 'USER INFO',
        description: (
          <>
            <p>{`Full name: ${data?.firstName} ${data?.lastName}`}</p>
            <p>{`Email: ${data?.email}`}</p>
            <p>{`Country: ${dropdownOptions.find((opt) => opt.value == data?.country).label}`}</p>
            <p>{`Technologies: ${data?.technologies.map((tec) => tec)} `}</p>
          </>
        ),
        type: 'confirm',
        handleConfirm: () => console.log(data),
      }),
    );
  };

  const onFiltersSubmit = (data: Record<string, string>) =>
    alert(`?${new URLSearchParams(data).toString()}`);

  return loading ? (
    <Preloader />
  ) : (
    <Container>
      <div className={styles.form}>
        <Button
          variant="outlined"
          onClick={() =>
            dispatch(
              openModal({
                title: 'CONFIRM MODAL',
                description: 'If you click in CONFIRM a message will be consoled',
                type: 'confirm',
                handleConfirm: () => console.log('Hello there'),
              }),
            )
          }
        >
          OPEN CONFIRM MODAL
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            dispatch(
              openModal({
                title: 'ALERT MODAL',
                description: 'This is going to be an alert message',
                type: 'alert',
              }),
            )
          }
        >
          OPEN ALERT MODAL
        </Button>
      </div>
      <form className={styles.form}>
        <Text variant="h1">User form</Text>
        <InputText
          control={control}
          name="firstName"
          label="First Name"
          variant="standard"
          margin="normal"
        />
        <InputText
          control={control}
          name="lastName"
          label="Last Name"
          variant="outlined"
          margin="normal"
        />
        <InputText control={control} name="email" label="Email" variant="filled" margin="normal" />

        <Dropdown
          variant="standard"
          control={control}
          name="country"
          options={dropdownOptions}
          label={'Select a country'}
          margin="normal"
        />
        <Checkboxes
          label="Technologies* (pick at least 2)"
          name="technologies"
          control={control}
          options={checkboxOptions}
        />
        <div className={styles.div}>
          <Button onClick={() => reset()} variant="outlined">
            Reset
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </div>
      </form>

      {superAdmins?.length !== 0 && (
        <Table<SuperAdmin>
          headCells={headCells}
          rows={superAdmins}
          title="Super Admins list"
          icons={true}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          exportButtons={true}
          handleExportSelection={handleExportSelection}
          handleExportTable={handleExportTable}
          filters={['id', 'name', 'status']}
          onFiltersSubmit={onFiltersSubmit}
        />
      )}
    </Container>
  );
};

export default Storybook;
