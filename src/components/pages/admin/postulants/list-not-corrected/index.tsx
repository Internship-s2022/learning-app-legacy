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
import { useAppDispatch, useAppSelector } from 'src/redux';
import { resetQuery, setQuery } from 'src/redux/modules/postulant-course/actions';
import { correctTests, getNotCorrectedPostulants } from 'src/redux/modules/postulant-course/thunks';
import { RootReducer } from 'src/redux/modules/types';
import { openModal } from 'src/redux/modules/ui/actions';
import { convertDatatoNotes, convertPostulantCourses } from 'src/utils/formatters';
import { generateDynamicHeadCell } from 'src/utils/generate-dynamic-head-cell';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterQuery]);

  useEffect(() => {
    if (errorData.error && errorData.status != 404) {
      dispatch(openModal(cannotShowList({ entity: 'postulantes' })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorData]);

  useEffect(
    () => () => {
      dispatch(resetQuery());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const dynamicHeadCells = [
    ...postulantCourseHeadCells,
    ...(generateDynamicHeadCell(admissionTests, false) as HeadCell[]),
  ];

  const convertedPostulantCourse = useMemo(
    () => convertPostulantCourses(notCorrectedPostulantCourses, views),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [notCorrectedPostulantCourses, filterQuery],
  );

  const handleCorrectTests = () => {
    const notesToSend = notes.filter((note) =>
      selectedObjects.some((obj) => obj.postulantId == note.postulantId),
    );
    dispatch(
      openModal({
        title: 'Enviar notas',
        description: '¿Está seguro que desea enviar las notas seleccionadas?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(correctTests(courseId, '', notesToSend));
          setSelectedObjects([]);
        },
      }),
    );
  };

  const handleCorrectTest = (data) => {
    const singleNote = [notes.find((note) => note.postulantId === data.row.postulantId)];
    dispatch(
      openModal({
        title: 'Enviar notas',
        description:
          selectedObjects.length > 1
            ? '¿Está seguro que desea agregar las notas de este postulante? Se perderán los otros datos ingresados. '
            : '¿Está seguro que desea agregar las notas de este postulante?',
        type: 'confirm',
        handleConfirm: () => {
          dispatch(correctTests(courseId, '', singleNote));
          setSelectedObjects([]);
        },
      }),
    );
  };

  const onInputChange = (data) => {
    const dataConverted = convertDatatoNotes(data, admissionTests);
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
          editableProp="score"
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
