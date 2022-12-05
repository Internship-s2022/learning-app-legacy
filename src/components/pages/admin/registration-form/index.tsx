import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CustomTable from 'src/components/shared/ui/table';
import { registrationFormHeadCells } from 'src/constants/head-cells';
import { confirmDelete } from 'src/constants/modal-content';
import { RegistrationFormType } from 'src/interfaces/entities/registration-form';
import { useAppDispatch, useAppSelector } from 'src/redux';
import {
  deleteRegistrationForm,
  getRegistrationFormByCourseId,
} from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

const RegistrationForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { courseId } = useParams();

  const { registrationForm, isLoading, pagination } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );
  useEffect(() => {
    dispatch(getRegistrationFormByCourseId(`?isActive=true&course._id=${courseId}`));
  }, []);

  console.log('currentRegistrationForm', registrationForm);

  const handleDelete = (id: string) => {
    dispatch(
      openModal(
        confirmDelete({
          entity: 'formulario de registro',
          handleConfirm: () => {
            dispatch(deleteRegistrationForm(id));
          },
        }),
      ),
    );
  };

  // const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
  //   dispatch(
  //     getRegistrationForms(
  //       `?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
  //     ),
  //   );
  // };

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(
  //     getRegistrationForms(
  //       `?isActive=true&page=${pagination.page}&limit=${parseInt(
  //         event.target.value,
  //         10,
  //       )}${filterQuery}`,
  //     ),
  //   );
  // };

  return (
    <section>
      <div>Registration form screen</div>
      {/* <CustomTable<RegistrationFormType>
        headCells={registrationFormHeadCells}
        rows={registrationForms}
        isLoading={isLoading}
        deleteIcon={true}
        handleDelete={handleDelete}
        pagination={pagination}
        editIcon={true}
        exportButton={false}
        customIconText="Ver"
        handleChangePage={function (event: unknown, newPage: number): void {
          throw new Error('Function not implemented.');
        }}
        handleChangeRowsPerPage={function (event: React.ChangeEvent<HTMLInputElement>): void {
          throw new Error('Function not implemented.');
        }}
      /> */}
    </section>
  );
};

export default RegistrationForm;
