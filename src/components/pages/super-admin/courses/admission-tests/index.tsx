import { ThunkDispatch } from 'redux-thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { EditableTableData } from 'src/components/shared/ui/table/types';
import { admissionTestHeadCells } from 'src/constants/head-cells';
import { AdmissionTest } from 'src/interfaces/entities/admission-test';
import { getAdmissionTests } from 'src/redux/modules/admission-test/thunks';
import { RootAction, RootReducer } from 'src/redux/modules/types';
import { download } from 'src/utils/export-csv';

const AdmissionTestsList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState<AdmissionTest[]>([]);
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
    download(`/admission-test/export/csv?${filterQuery}`, 'admission-test');
  };

  const handleEditableInputs = (data: EditableTableData) => {
    let resultingString = '';
    for (const property of Object.getOwnPropertyNames(data)) {
      resultingString += `${property}: ${data[property]}\n`;
    }
    alert(resultingString);
  };

  const onInputChange = (data) => {
    const noteIndex = notes.findIndex((note) => note.row._id === data.row._id);
    if (noteIndex === -1) {
      setNotes([...notes, data]);
    } else {
      setNotes(notes.map((note, index) => (index === noteIndex ? data : note)));
    }
  };

  const onSubmitAll = (notes: EditableTableData[]) => {
    const notesToSend = notes
      .filter((note) => selectedObjects.find((obj) => obj._id === note.row._id))
      .map(({ row, ...rest }) => ({ id: row._id, ...rest }));
    let resultingString = '';
    notesToSend.forEach((note) => {
      for (const property of Object.getOwnPropertyNames(note)) {
        resultingString += `${property}: ${note[property]} `;
      }
      resultingString += '\n';
    });
    alert(resultingString);
  };

  return (
    <Box>
      <Text variant="h1">Tests de admisión</Text>
      <Button variant="outlined" onClick={() => onSubmitAll(notes)}>
        Subir notas
      </Button>
      {errorData.error && errorData.status != 404 ? (
        <Text variant="h2">Hubo un error al cargar la tabla de cursos.</Text>
      ) : (
        <CustomTable<AdmissionTest>
          headCells={admissionTestHeadCells}
          rows={admissionTests}
          isLoading={isLoading}
          pagination={pagination}
          exportButton={false}
          deleteIcon={false}
          editIcon={false}
          handleExportTable={handleExportTable}
          saveEditableText="Guardar notas"
          onEditableSubmit={handleEditableInputs}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          onInputChange={onInputChange}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      )}
    </Box>
  );
};

export default AdmissionTestsList;
