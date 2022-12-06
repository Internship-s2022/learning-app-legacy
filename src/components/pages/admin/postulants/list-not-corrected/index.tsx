import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { postulantCourseHeadCells } from 'src/constants/head-cells';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery } from 'src/redux/modules/admission-test/actions';
import { correctTests, getNotCorrectedPostulants } from 'src/redux/modules/postulant-course/thunks';
import { getRegistrationForms } from 'src/redux/modules/registration-form/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './postulant-list.module.css';

const ListNotCorrectedPostulants = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { notCorrectedPostulantCourses, errorData, isLoading, pagination, filterQuery } =
    useAppSelector((state: RootReducer) => state.postulantCourse);
  const { registrationForms, isLoading: isLoadingRegistration } = useAppSelector(
    (state: RootReducer) => state.registrationForm,
  );
  const { courseId } = useParams();
  const views = registrationForms[0]?.views;
  const admissionTests = notCorrectedPostulantCourses[0]?.admissionResults.map(
    (at) => at.admissionTest.name,
  );
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    dispatch(
      getNotCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
    // TO-DO: Add dispatch registration form
    // dispatch(getRegistrationForms(`&course._id=${courseId}`));
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
      getNotCorrectedPostulants(
        courseId,
        `&page=${newPage + 1}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      getNotCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${parseInt(event.target.value, 10)}${filterQuery}`,
      ),
    );
  };

  const getNotCorrected = () => {
    return notCorrectedPostulantCourses
      .reduce(
        (prev = [{}], obj, index) => {
          const {
            postulant: { _id, lastName, firstName, email, birthDate, location },
          } = obj;
          const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
          const view = views?.find((v) => v._id == obj.view)?.name;
          const admissionInfo = obj.admissionResults.reduce((acc = {}, admRe: AdmissionResult) => {
            return {
              ...acc,
              [admRe.admissionTest.name]: { score: admRe.score, admissionResult: admRe._id },
            };
          }, {});
          prev[index] = {
            _id,
            firstName,
            lastName,
            location,
            age,
            email,
            view,
            ...admissionInfo,
          };
          return prev;
        },
        [{}],
      )
      .sort((a: any, b: any) => a.firstName.localeCompare(b.firstName));
  };

  const generateDynamicHeadCell = () => {
    return admissionTests?.reduce(
      (prev = [{}], obj, index) => {
        prev[index] = {
          id: obj,
          numeric: false,
          disablePadding: false,
          label: obj,
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
  const converted = useMemo(() => getNotCorrected(), [notCorrectedPostulantCourses]);

  const handleCorrectTests = () => {
    dispatch(
      openModal({
        title: 'Enviar notas',
        description: '¿Está seguro que desea enviar las notas seleccionadas?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(correctTests(courseId, '', notes));
          // navigate('');
          // window.location.reload();
        },
      }),
    );
  };

  const convert = (data) => {
    const scores = admissionTests?.reduce(
      (prev = [{}], testName, index) => {
        prev[index] = {
          admissionResult: data.row[testName].admissionResult,
          score: Number(data[testName]),
        };
        return prev;
      },
      [{}],
    );
    return { postulantId: data.row._id, scores };
  };

  const onInputChange = (data) => {
    const dataConverted = convert(data);
    const noteIndex = notes.findIndex((note) => note.postulantId === data.row._id);
    if (noteIndex === -1) {
      setNotes([...notes, dataConverted]);
    } else {
      setNotes(notes.map((note, index) => (index === noteIndex ? dataConverted : note)));
    }
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
      ) : converted?.length && notCorrectedPostulantCourses.length ? (
        <CustomTable
          key={`list-not-correct-${converted.length}`}
          headCells={dynamicHeadCells}
          rows={converted}
          isLoading={isLoading || isLoadingRegistration}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          addButton={{
            text: 'Subir notas',
            onClick: handleCorrectTests,
            disabled: !selectedObjects.length,
            startIcon: <ArrowUpwardIcon />,
          }}
          saveEditableText="Agregar nota"
          onEditableSubmit={handleCorrectTests}
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
