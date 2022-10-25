import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Container } from '@mui/material';

import { Checkboxes, Dropdown, InputText, Preloader, Table, Text } from 'src/components/shared/ui/';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { getUsers } from 'src/redux/modules/user/thunks';
import { User } from 'src/redux/modules/user/types';

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

const headCells: HeadCell<any>[] = [
  {
    id: 'postulantId.lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last name',
  },
  {
    id: 'postulantId.firstName',
    numeric: false,
    disablePadding: false,
    label: 'First name',
  },
  {
    id: 'postulantId.email',
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

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const users = useSelector((state: RootReducer) => state.user.users);

  useEffect(() => {
    dispatch(getUsers(''));
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

  const handleExportTable = (entity: string) => {
    //alert(`All selection (${_ids.length} items): ${_ids}`);
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
    <Container className={styles.section}>
      <Table<User>
        headCells={headCells}
        rows={users}
        icons={true}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        exportButtons={true}
        handleExportSelection={handleExportSelection}
        handleExportTable={handleExportTable}
        filters={['id', 'name', 'status']}
        onFiltersSubmit={onFiltersSubmit}
      />
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
    </Container>
  );
};

export default Storybook;
