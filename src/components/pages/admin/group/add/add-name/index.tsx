import React from 'react';
import { Box } from '@mui/material';

import { Dropdown, InputText, Text } from 'src/components/shared/ui';
import { typeOptions } from 'src/constants/dropdown-options';

import styles from './add-name.module.css';
import { AddGroupProps } from './types';

const AddInfo = ({
  controlAddInfo,
  handleSubmitAddInfo,
  onSubmitAddInfo,
}: AddGroupProps): JSX.Element => {
  return (
    <section data-testid="add-group-container-section" className={styles.container}>
      <div className={styles.titleContainer}>
        <Text variant="h1">Nombre y tipo de grupo</Text>
        <Text variant="subtitle1" className={styles.subtitle}>
          Ingresa el nombre y el tipo con el cual aparecerá el grupo.
        </Text>
      </div>
      <form
        data-testid="add-group-container-form"
        className={styles.form}
        onSubmit={handleSubmitAddInfo(onSubmitAddInfo)}
      >
        <Box className={styles.margin15}>
          <InputText control={controlAddInfo} name="name" label="Nombre del grupo" size="small" />
        </Box>
        <Box className={styles.margin15}>
          <Dropdown
            options={typeOptions}
            control={controlAddInfo}
            name="type"
            label="Tipo de grupo"
            variant="outlined"
            size="small"
          />
        </Box>
      </form>
    </section>
  );
};

export default AddInfo;
