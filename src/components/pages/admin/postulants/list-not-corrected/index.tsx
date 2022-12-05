import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { EditableTableData, HeadCell } from 'src/components/shared/ui/table/types';
import { postulantCourseHeadCells } from 'src/constants/head-cells';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery } from 'src/redux/modules/admission-test/actions';
import * as actions from 'src/redux/modules/postulant-course/actions';
import { getPostulantsByCourseId } from 'src/redux/modules/postulant-course/thunks';
import { getRegistrationForms } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './postulant-list.module.css';

const ListNotCorrectedPostulants = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { postulantCourses, errorData, isLoading, pagination, filterQuery } = useAppSelector(
    (state: RootReducer) => state.postulantCourse,
  );
  const { registrationForms, isLoading: isLoadingRegistration } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );
  const { courseId } = useParams();
  const views = registrationForms?.filter((rf) => rf.course._id === courseId)[0]?.views;
  const admissionTests = postulantCourses[0]?.admissionResults;
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    dispatch(actions.getPostulantsByCourseId.request(''));
    dispatch(
      getPostulantsByCourseId(
        courseId,
        `?corrected=false&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    dispatch(getRegistrationForms());
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(
        openModal({
          title: 'Ocurrió un error',
          description: 'No se puede mostrar la lista de postulantes, intente nuevamente.',
          type: 'alert',
        }),
      );
    }
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    [],
  );

  const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
    dispatch(
      getPostulantsByCourseId(
        courseId,
        `?corrected=false&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getPostulantsByCourseId(
        courseId,
        `?corrected=false&page=${pagination.page}&limit=${parseInt(
          event.target.value,
          10,
        )}${filterQuery}`,
      ),
    );
  };

  const getNotCorrected = () => {
    return postulantCourses.reduce(
      (prev = [{}], obj, index) => {
        const {
          postulant: { _id, lastName, firstName, birthDate, location },
        } = obj;
        const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
        const view = views?.find((v) => v._id == obj.view)?.name;
        const admissionInfo = obj.admissionResults.reduce((acc = {}, admRe: AdmissionResult) => {
          return { ...acc, [admRe.admissionTest.name]: { score: admRe.score, id: admRe._id } };
        }, {});
        prev[index] = { _id, firstName, lastName, location, age, view, ...admissionInfo };
        return prev;
      },
      [{}],
    );
  };

  const generateDynamicHeadCell = () => {
    return admissionTests?.reduce(
      (prev = [{}], obj, index) => {
        prev[index] = {
          id: obj.admissionTest.name,
          numeric: false,
          disablePadding: false,
          label: obj.admissionTest.name,
          editable: true,
        };
        return prev;
      },
      [{}],
    );
  };

  const dynamicHeadCells = admissionTests?.length && [
    ...postulantCourseHeadCells,
    ...(generateDynamicHeadCell() as HeadCell[]),
  ];

  const notCorrectedPostulantCourse = getNotCorrected();

  const handleCorrectTest = () => {
    console.log('selectedObjects', selectedObjects);
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

  const handleCorrectManyTests = () => {
    console.log('selectedObjects :>> ', selectedObjects);
    console.log('notes', notes);
  };

  return (
    <Box>
      {errorData.error && errorData.status != 404 ? (
        <div
          data-testid="list-corrected-postulants-title-container-div-error"
          className={styles.titleContainer}
        >
          <Text variant="h2">Hubo un error al cargar la tabla de postulantes.</Text>
        </div>
      ) : postulantCourses.length && notCorrectedPostulantCourse.length ? (
        <CustomTable
          headCells={dynamicHeadCells}
          rows={notCorrectedPostulantCourse}
          isLoading={isLoading || isLoadingRegistration}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          addButton={{
            text: 'Subir notas',
            onClick: handleCorrectManyTests,
            disabled: !selectedObjects.length,
            startIcon: <ArrowUpwardIcon />,
          }}
          saveEditableText="Agregar nota"
          handleCustomIcon={handleCorrectTest}
          onEditableSubmit={handleEditableInputs}
          onInputChange={onInputChange}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      ) : (
        <div className={styles.titleContainer}>
          <Text variant="h2">No hay postulantes sin calificar en este curso.</Text>
        </div>
      )}
    </Box>
  );
};

export default ListNotCorrectedPostulants;
