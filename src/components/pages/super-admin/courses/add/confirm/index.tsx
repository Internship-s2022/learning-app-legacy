import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

import { Dropdown, InputText } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { courseInternalOptions } from 'src/constants/dropdown-options';
import { courseUserWithRoleHeadCells } from 'src/constants/head-cells';
import { CourseUser } from 'src/interfaces/entities/course-user';

import styles from './confirm.module.css';
import { ConfirmProps } from './types';

const Confirm = ({
  courseUsers,
  controlAddCourse,
  handleSubmitAddCourse,
  onSubmitAddCourse,
}: ConfirmProps): JSX.Element => {
  return (
    <section data-testid="confirmation-course-container-section">
      <form
        data-testid="confirmation-course-container-form"
        className={styles.containerForm}
        onSubmit={handleSubmitAddCourse(onSubmitAddCourse)}
      >
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
              label="Descripción del curso"
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
            options={courseInternalOptions}
            control={controlAddCourse}
            name="isInternal"
            label="Tipo"
            variant="outlined"
            showError={false}
            size="small"
            placeholder="Status"
          />
        </Box>
      </form>
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
        deleteIcon={false}
        editIcon={false}
        exportButton={false}
        handleChangePage={() => undefined}
        handleChangeRowsPerPage={() => undefined}
      />
    </section>
  );
};

export default Confirm;
