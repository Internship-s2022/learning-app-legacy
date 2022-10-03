import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

import Dropdown from 'src/components/shared/ui/dropdown';
import InputText from 'src/components/shared/ui/inputs/text';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { userThunks } from 'src/redux/modules/user';
import { decrement, increment, setUser } from 'src/redux/modules/user/actions';

import styles from './storybook.module.css';
import { LogInFormValues } from './types';

const resolver = joiResolver(
  Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(5).required(),
    country: Joi.string().required(),
  }),
);

const options = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const Storybook = (): JSX.Element => {
  const counter = useSelector((state: RootReducer) => state.user.counter);
  const users = useSelector((state: RootReducer) => state.user.users);

  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();

  useEffect(() => {
    if (users?.length) {
      dispatch(setUser(users[0]));
    }
  }, [users]);

  const { handleSubmit, control, reset } = useForm<LogInFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
    },
    mode: 'onSubmit',
    resolver,
  });

  const onSubmit = (data) => console.log(data);
  return (
    <section className={styles.container}>
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
        <Dropdown
          control={control}
          name="country"
          options={options}
          label={'Select an option'}
          margin="normal"
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
