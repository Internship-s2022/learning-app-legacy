import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

import { Checkboxes, Dropdown, InputText, Modal, Preloader, Text } from 'src/components/shared/ui/';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { setModal } from 'src/redux/modules/ui/actions';
import { setUser } from 'src/redux/modules/user/actions';

import styles from './storybook.module.css';
import { LogInFormValues } from './types';

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
  {
    value: 'ARG',
    label: 'Argentina',
  },
  {
    value: 'PAR',
    label: 'Paraguay',
  },
  {
    value: 'BOL',
    label: 'Bolivia',
  },
  {
    value: 'URG',
    label: 'Uruguay',
  },
];

const checkboxOptions = [
  { label: 'HTML', value: 'HTML' },
  { label: 'Javascript', value: 'Javascript' },
  { label: 'SQL', value: 'SQL' },
  { label: 'Typescript', value: 'Typescript' },
];

const Storybook = (): JSX.Element => {
  const users = useSelector((state: RootReducer) => state.user.users);
  const [modalContent, setModalContent] = useState<JSX.Element | string>(
    'This is going to be a short message',
  );
  const modalState = useSelector((state: RootReducer) => state.modalState.open);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  useEffect(() => {
    if (users?.length) {
      dispatch(setUser(users[0]));
    }
  }, [users]);

  const handleOpen = () => {
    dispatch(setModal(true));
  };

  const handleClose = () => {
    dispatch(setModal(false));
  };

  const { handleSubmit, control, reset } = useForm<LogInFormValues>({
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
    console.log(data);
    setModalContent(
      <>
        <p>{`Full name: ${data?.firstName} ${data?.lastName}`}</p>
        <p>{`Email: ${data?.email}`}</p>
        <p>{`Country: ${dropdownOptions.find((opt) => opt.value == data?.country).label}`}</p>
        <p>{`Technologies: ${data?.technologies.map((tec) => tec)} `}</p>
      </>,
    );
    handleOpen();
  };
  return loading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <Modal
        handleClose={handleClose}
        handleConfirm={handleClose}
        title={'USER INFO'}
        content={modalContent}
        open={modalState}
        type="alert"
      />
      <form className={styles.form}>
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
        <Text variant="h1">H1 Testing</Text>
        <Text variant="h2">H2 Testing</Text>
        <Text variant="h3">H3 Testing</Text>
        <Text color="error">Error</Text>
        <Dropdown
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
        <div>
          <Button onClick={() => reset()} variant="outlined">
            Reset
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Storybook;
