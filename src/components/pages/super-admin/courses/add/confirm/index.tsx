import React from 'react';

import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { User } from 'src/redux/modules/user/types';

const selectedUserHeadCells: HeadCell<User>[] = [
  {
    id: 'user.postulant.firstName',
    numeric: false,
    disablePadding: false,
    label: 'NOMBRE',
  },
  {
    id: 'user.postulant.lastName',
    numeric: false,
    disablePadding: false,
    label: 'APELLIDO',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'ROL',
  },
];

const Confirm = ({ course }: any): JSX.Element => {
  console.log('course', course);

  return (
    <section>
      <CustomTable<User>
        headCells={selectedUserHeadCells}
        rows={course?.courseUsers || []}
        pagination={{
          totalDocs: course.courseUsers.length,
          limit: course.courseUsers.length,
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
    </section>
  );
};

export default Confirm;
