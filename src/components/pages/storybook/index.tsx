import Joi from 'joi';
import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

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
  }),
);

const Storybook = (): JSX.Element => {
  const counter = useSelector((state: RootReducer) => state.user.counter);
  const users = useSelector((state: RootReducer) => state.user.users);
  const user = useSelector((state: RootReducer) => state.user.user);

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
    },
    mode: 'onSubmit',
    resolver,
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section className={styles.section}>
      <div className={styles.div}>
        <button onClick={() => dispatch(userThunks.getUsers())}>Fetch Users</button>
        <p>{`First name: ${user && user.firstName}`}</p>
        <p>{`Email: ${user && user.email}`}</p>
        <button onClick={() => dispatch(increment(1))}>+</button>
        <p>
          <>{counter}</>
        </p>
        <button onClick={() => dispatch(decrement(1))}>-</button>
      </div>
      <form className={styles.div}>
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
