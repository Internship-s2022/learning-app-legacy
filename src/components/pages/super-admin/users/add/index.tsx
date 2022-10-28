import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Divider, IconButton } from '@mui/material';

import { InputText, Text } from 'src/components/shared/ui';

import styles from './addUser.module.css';
import { AddUserFormValues } from './types';

const AddUser = (): JSX.Element => {
  const [dniFound, setDniFound] = useState<boolean | string>('');
  const dniExample = '41343398';

  const dniValidation = (data: AddUserFormValues) => {
    if (data.dni === dniExample) {
      setDniFound(true);
    } else {
      setDniFound(false);
    }
  };
  const { handleSubmit, control } = useForm<AddUserFormValues>({
    defaultValues: {
      dni: '',
    },
    mode: 'onSubmit',
  });
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Text variant="h1">Users - Add user</Text>
        <Text variant="body1">
          Insert the user DNI, if it exist in the database, the fields will be automatically filled.
          <br />
          In case it does not exist, the data must be entered manually.
        </Text>
        <form className={styles.headerForm} onSubmit={handleSubmit(dniValidation)}>
          <InputText
            control={control}
            name="dni"
            label="DNI"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <div className={styles.DNIvalidation}>
            <Text variant="body1">{dniFound ? 'Dni found ' : 'Dni not found'}</Text>
            {dniFound ? (
              <CheckCircleOutlineIcon color="primary" />
            ) : (
              <CancelOutlinedIcon color="error" />
            )}
          </div>

          <InputText
            control={control}
            name="newEmail"
            label="Email"
            size="small"
            disabled={!dniFound}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="text" startIcon={<AddIcon />} size="small" disabled={!dniFound}>
            Generate account
          </Button>
        </form>
      </div>
      <Divider variant="fullWidth" />
    </section>
  );
};

export default AddUser;
