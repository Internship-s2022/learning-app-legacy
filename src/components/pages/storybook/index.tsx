import Joi from 'joi';
import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';

import styles from './storybook.module.css';

const schema = Joi.object({
  firstName: Joi.string().min(4).required(),
  lastName: Joi.string().min(4).required(),
});

import InputText from 'src/components/shared/ui/inputs/text';

type LogInFormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const Storybook = (): JSX.Element => {
  const { handleSubmit, control, reset } = useForm<LogInFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    mode: 'onSubmit',
    resolver: joiResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form className={styles.container}>
      <InputText<LogInFormValues>
        control={control}
        name="firstName"
        label="First Name"
        placeholder="standard"
        variant="standard"
        margin="normal"
      />
      <InputText
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="outlined"
        variant="outlined"
        margin="normal"
      />
      <InputText
        control={control}
        name="email"
        label="Email"
        placeholder="filled"
        variant="filled"
        margin="normal"
      />

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      <Button onClick={() => reset()} variant={'outlined'}>
        Reset
      </Button>
    </form>
  );
};
export default Storybook;
