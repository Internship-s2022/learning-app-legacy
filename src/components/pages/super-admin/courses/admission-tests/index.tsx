import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';

import { Preloader, Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { admissionTestHeadCells } from 'src/constants/head-cells';
import { AdmissionTest } from 'src/interfaces/entities/admission-test';
import { getAdmissionTests } from 'src/redux/modules/admission-test/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { download } from 'src/utils/export-csv';

const AdmissionTestsList = () => {
  const dispatch = useDispatch<ThunkDispatch<RootReducer, null, RootAction>>();
  const { admissionTests, errorData, isLoading, pagination, filterQuery } = useSelector(
    (state: RootReducer) => state.admissionTest,
  );

  useEffect(() => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery]);

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getAdmissionTests(
        `?isActive=true&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const handleExportTable = () => {
    download(`/admission-test/export/csv?${filterQuery}`, 'courses');
  };

  const handleEditableInputs = (data) => {
    let resultingString = '';
    for (const property of Object.getOwnPropertyNames(data)) {
      resultingString += `${property}: ${data[property]}\n`;
    }
    alert(resultingString);
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <Box>
      <Text variant="h1">Tests de admisión</Text>
      {errorData.error && errorData.status != 404 ? (
        <Text variant="h2">Hubo un error al cargar la tabla de cursos.</Text>
      ) : (
        <CustomTable<AdmissionTest>
          headCells={admissionTestHeadCells}
          rows={admissionTests}
          pagination={pagination}
          exportButton={true}
          deleteIcon={false}
          editIcon={false}
          handleExportTable={handleExportTable}
          saveEditableText="Guardar notas"
          onEditableClick={handleEditableInputs}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default AdmissionTestsList;
