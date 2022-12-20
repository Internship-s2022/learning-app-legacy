import React from 'react';
import { Box, Chip } from '@mui/material';

import { Dropdown, InputText, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { cannotDoAction } from 'src/constants/modal-content';
import { CourseUser } from 'src/interfaces/entities/course-user';
import { GroupTypes } from 'src/interfaces/entities/group';
import { ModuleType } from 'src/interfaces/entities/module';
import { useAppDispatch } from 'src/redux';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './confirm.module.css';
import { ConfirmProps } from './types';

const Confirm = ({
  courseUsers,
  modules,
  setModules,
  handleDeleteUser,
  controlAddGroup,
  handleSubmitAddGroup,
  onSubmitAddGroup,
}: ConfirmProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const typeOptions: { value: GroupTypes; label: string }[] = [
    { value: 'DEV', label: 'DEV' },
    { value: 'GENERAL', label: 'GENERAL' },
    { value: 'QA', label: 'QA' },
    { value: 'UIUX', label: 'UIUX' },
  ];

  const handleDeleteModule = (modToDelete: ModuleType) => () => {
    if (modules.length === 1) {
      dispatch(openModal(cannotDoAction({ reason: 'Debe haber al menos un módulo asignado.' })));
    } else setModules((modules) => modules.filter((mod) => mod._id !== modToDelete._id));
  };

  return (
    <section data-testid="confirmation-group-container-section">
      <form
        data-testid="confirmation-group-container-form"
        className={styles.formContainer}
        onSubmit={handleSubmitAddGroup(onSubmitAddGroup)}
      >
        <Box className={styles.inputBox}>
          <InputText control={controlAddGroup} name="name" label="Nombre del grupo" size="small" />
        </Box>
        <Box className={styles.inputBox}>
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
      <Box className={styles.infoContainer}>
        <Text variant="subtitle1">Módulos asignados.</Text>
        <Box className={styles.chipContainer}>
          {modules.map((mod, index) => (
            <Chip key={index} label={mod.name} onDelete={handleDeleteModule(mod)} color="primary" />
          ))}
        </Box>
      </Box>
      <CustomTable<CourseUser>
        headCells={courseUserWithRoleHeadCells}
        rows={courseUsers}
        pagination={{
          totalDocs: courseUsers.length,
          limit: 100,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        }}
        checkboxes={false}
        deleteIcon={true}
        handleDelete={handleDeleteUser}
        editIcon={false}
        exportButton={false}
        handleChangePage={() => undefined}
        handleChangeRowsPerPage={() => undefined}
      />
    </section>
  );
};

export default Confirm;
