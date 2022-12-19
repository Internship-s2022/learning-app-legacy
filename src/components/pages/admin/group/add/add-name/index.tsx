import React from 'react';
import { Box } from '@mui/material';

import { Dropdown, InputText, Text } from 'src/components/shared/ui';
import { GroupTypes } from 'src/interfaces/entities/group';

import styles from './add-name.module.css';
import { AddGroupProps } from './types';

const AddName = ({
  controlAddGroup,
  handleSubmitAddName,
  onSubmitAddName,
}: AddGroupProps): JSX.Element => {
  const typeOptions: { value: GroupTypes; label: string }[] = [
    { value: 'DEV', label: 'DEV' },
    { value: 'GENERAL', label: 'GENERAL' },
    { value: 'QA', label: 'QA' },
    { value: 'UIUX', label: 'UIUX' },
  ];

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
        onSubmit={handleSubmitAddName(onSubmitAddName)}
      >
        <Box className={styles.margin15}>
          <InputText control={controlAddGroup} name="name" label="Nombre del grupo" size="small" />
        </Box>
        <Box className={styles.margin15}>
          <Dropdown
            options={typeOptions}
            control={controlAddGroup}
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

export default AddName;
