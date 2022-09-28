import Joi from 'joi';
import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

import InputText from 'src/components/shared/ui/inputs/text';

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
    <section className={styles.container}>
      <form className={styles.form}>
        <InputText<LogInFormValues>
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
