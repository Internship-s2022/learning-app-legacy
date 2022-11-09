import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { selectedUserHeadCells } from 'src/constants/head-cells';

import styles from './confirm.module.css';
import { ConfirmProps, CourseUserType } from './types';

const Confirm = ({
  courseUsers,
  controlAddCourse,
  handleSubmitAddCourse,
  onSubmitAddCourse,
}: ConfirmProps): JSX.Element => {
  const courseUsersTable = courseUsers.map((courseUser) => ({
    ...courseUser.user,
    role: courseUser.role,
  }));

  return (
    <section>
      <form onSubmit={handleSubmitAddCourse(onSubmitAddCourse)}>
        <Box className={styles.inputBox}>
          <Box className={styles.inputAndIcon}>
            <InputText
              control={controlAddCourse}
              name="name"
              label="Nombre del curso"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <EditIcon color="action" />
          </Box>
          <Box className={styles.inputAndIcon}>
            <InputText
              control={controlAddCourse}
              name="description"
              label="Descripcion del curso"
              size="medium"
              multiline
              rows={4}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <EditIcon color="action" />
          </Box>
        </Box>
        <Box className={styles.dropdown}>
          <Dropdown
            options={[
              { value: 'true', label: 'Interno' },
              { value: 'false', label: 'Externo' },
            ]}
            control={controlAddCourse}
            name="isInternal"
            label="Tipo"
            variant="outlined"
            showError={false}
            size="small"
            placeholder="Status"
          />
        </Box>
        <CustomTable<CourseUserType>
          headCells={selectedUserHeadCells}
          rows={courseUsersTable}
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
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          handleChangePage={() => {
            console.log();
          }}
          handleChangeRowsPerPage={() => {
            console.log();
          }}
        />
      </form>
    </section>
  );
};

export default Confirm;
