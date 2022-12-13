import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import CustomTable from 'src/components/shared/ui/table';
import { PostulantCourseFilter } from 'src/components/shared/ui/table/components/filters/postulant-course/types';
import { HeadCell } from 'src/components/shared/ui/table/types';
import { postulantCourseHeadCells } from 'src/constants/head-cells';
import { cannotShowList } from 'src/constants/modal-content';
import { AdmissionResult } from 'src/interfaces/entities/postulant-course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/postulant-course/actions';
import { correctTests, getNotCorrectedPostulants } from 'src/redux/modules/postulant-course/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './postulant-list.module.css';

const ListNotCorrectedPostulants = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { notCorrectedPostulantCourses, errorData, isLoading, pagination, filterQuery } =
    useAppSelector((state: RootReducer) => state.postulantCourse);
  const { registrationForm } = useAppSelector((state: RootReducer) => state.registrationForm);
  const { course } = useAppSelector((state: RootReducer) => state.course);
  const { courseId } = useParams();
  const views = registrationForm?.views;
  const admissionTests = course?.admissionTests.map((at) => at.name);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    dispatch(
      getNotCorrectedPostulants(
        courseId,
        `&page=${pagination.page}&limit=${pagination.limit}${filterQuery}`,
      ),
    );
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'postulantes' })));
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
      ?.reduce((prev = [], obj, index) => {
        const {
          postulant: { _id, lastName, firstName, email, age, location },
        } = obj;
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
      }, [])
      .sort((a: { firstName: string }, b: { firstName: string }) =>
        a.firstName.localeCompare(b.firstName),
      );
  };

  const generateDynamicHeadCell = () => {
    if (admissionTests?.length) {
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
    } else {
      return [];
    }
  };

  const dynamicHeadCells = [
    ...postulantCourseHeadCells,
    ...(generateDynamicHeadCell() as HeadCell[]),
  ];

  const convertedPostulantCourse = useMemo(
    () => getNotCorrected(),
    [notCorrectedPostulantCourses, filterQuery],
  );

  const handleCorrectTests = () => {
    dispatch(
      openModal({
        title: 'Enviar notas',
        description: '¿Está seguro que desea enviar las notas seleccionadas?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(correctTests(courseId, '', notes));
          setSelectedObjects([]);
        },
      }),
    );
  };

  const handleCorrectTest = (data) => {
    const singleNote = [notes.find((note) => note.postulantId === data.row._id)];
    dispatch(
      openModal({
        title: 'Enviar notas',
        description: '¿Está seguro que desea agregar las notas de este postulante?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(correctTests(courseId, '', singleNote));
          setSelectedObjects([]);
        },
      }),
    );
  };

  const convertData = (data) => {
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
    const dataConverted = convertData(data);
    const noteIndex = notes.findIndex((note) => note.postulantId === data.row._id);
    if (noteIndex === -1) {
      setNotes([...notes, dataConverted]);
    } else {
      setNotes(notes.map((note, index) => (index === noteIndex ? dataConverted : note)));
    }
  };

  const onFiltersSubmit: SubmitHandler<Partial<PostulantCourseFilter>> = (
    data: Record<string, string>,
  ) => {
    const dataFiltered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ''));
    dispatch(setQuery(`&${new URLSearchParams(dataFiltered).toString().replace(/_/g, '.')}`));
  };

  return (
    <Box className={styles.container}>
      {errorData.error && errorData.status != 404 ? (
        <div
          data-testid="list-corrected-postulants-title-container-div-error"
          className={styles.titleContainer}
        >
          <Text variant="h2">Hubo un error al cargar la tabla de postulantes.</Text>
        </div>
      ) : (
        <CustomTable
          key={`list-not-correct-${convertedPostulantCourse.length}`}
          headCells={dynamicHeadCells}
          rows={convertedPostulantCourse}
          isLoading={isLoading}
          pagination={pagination}
          deleteIcon={false}
          editIcon={false}
          exportButton={false}
          addButton={{
            text: 'Subir notas',
            onClick: handleCorrectTests,
            disabled: !selectedObjects.length || !notes.length,
            startIcon: <ArrowUpwardIcon />,
          }}
          saveEditableText="Agregar nota"
          onEditableSubmit={handleCorrectTest}
          onInputChange={onInputChange}
          filter="postulantCourse"
          onFiltersSubmit={onFiltersSubmit}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />
      )}
    </Box>
  );
};

export default ListNotCorrectedPostulants;
